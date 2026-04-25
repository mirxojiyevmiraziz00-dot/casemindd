CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.legal_document_type AS ENUM ('criminal_code_uz', 'criminal_code_en', 'plenum_decision', 'other');
CREATE TYPE public.legal_document_status AS ENUM ('uploaded', 'processing', 'ready', 'failed');

CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

CREATE TABLE public.legal_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  document_type public.legal_document_type NOT NULL,
  language TEXT NOT NULL DEFAULT 'uz',
  storage_path TEXT NOT NULL UNIQUE,
  file_name TEXT NOT NULL,
  mime_type TEXT,
  file_size BIGINT,
  status public.legal_document_status NOT NULL DEFAULT 'uploaded',
  extracted_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_legal_documents_updated_at
BEFORE UPDATE ON public.legal_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_legal_documents_type ON public.legal_documents(document_type);
CREATE INDEX idx_legal_documents_user_id ON public.legal_documents(user_id);
CREATE INDEX idx_legal_documents_created_at ON public.legal_documents(created_at DESC);

CREATE POLICY "Profiles are viewable by owner"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view legal documents"
ON public.legal_documents
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can upload legal documents"
ON public.legal_documents
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own legal documents"
ON public.legal_documents
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'))
WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete own legal documents"
ON public.legal_documents
FOR DELETE
TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

INSERT INTO storage.buckets (id, name, public)
VALUES ('legal-documents', 'legal-documents', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Legal documents are readable"
ON storage.objects
FOR SELECT
USING (bucket_id = 'legal-documents');

CREATE POLICY "Authenticated users can upload legal document files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'legal-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own legal document files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'legal-documents' AND auth.uid()::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'legal-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own legal document files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'legal-documents' AND auth.uid()::text = (storage.foldername(name))[1]);