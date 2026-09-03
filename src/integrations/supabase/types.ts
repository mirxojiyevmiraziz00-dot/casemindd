export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      case_history: {
        Row: {
          ai_response: string | null
          area: string | null
          created_at: string
          id: string
          image_url: string | null
          situation: string
          title: string
          user_id: string
        }
        Insert: {
          ai_response?: string | null
          area?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          situation: string
          title: string
          user_id: string
        }
        Update: {
          ai_response?: string | null
          area?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          situation?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      consultation_requests: {
        Row: {
          area: string | null
          contact: string
          created_at: string
          full_name: string
          id: string
          lawyer_id: string | null
          situation: string
          status: string
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          area?: string | null
          contact: string
          created_at?: string
          full_name: string
          id?: string
          lawyer_id?: string | null
          situation: string
          status?: string
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          area?: string | null
          contact?: string
          created_at?: string
          full_name?: string
          id?: string
          lawyer_id?: string | null
          situation?: string
          status?: string
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultation_requests_lawyer_id_fkey"
            columns: ["lawyer_id"]
            isOneToOne: false
            referencedRelation: "lawyers"
            referencedColumns: ["id"]
          },
        ]
      }
      lawyers: {
        Row: {
          areas: string[]
          bio: string
          city: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          experience_years: number | null
          full_name: string
          id: string
          is_active: boolean
          languages: string[]
          photo_url: string | null
          rating: number | null
          telegram: string | null
        }
        Insert: {
          areas?: string[]
          bio: string
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          experience_years?: number | null
          full_name: string
          id?: string
          is_active?: boolean
          languages?: string[]
          photo_url?: string | null
          rating?: number | null
          telegram?: string | null
        }
        Update: {
          areas?: string[]
          bio?: string
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          experience_years?: number | null
          full_name?: string
          id?: string
          is_active?: boolean
          languages?: string[]
          photo_url?: string | null
          rating?: number | null
          telegram?: string | null
        }
        Relationships: []
      }
      legal_documents: {
        Row: {
          created_at: string
          description: string | null
          document_type: string
          extracted_text: string | null
          file_name: string | null
          file_size: number | null
          id: string
          language: string
          legal_area: string | null
          mime_type: string | null
          source_url: string | null
          status: string
          storage_path: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          document_type: string
          extracted_text?: string | null
          file_name?: string | null
          file_size?: number | null
          id?: string
          language?: string
          legal_area?: string | null
          mime_type?: string | null
          source_url?: string | null
          status?: string
          storage_path?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          document_type?: string
          extracted_text?: string | null
          file_name?: string | null
          file_size?: number | null
          id?: string
          language?: string
          legal_area?: string | null
          mime_type?: string | null
          source_url?: string | null
          status?: string
          storage_path?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payment_cards: {
        Row: {
          bank_name: string | null
          card_holder: string
          created_at: string
          expiry_month: number
          expiry_year: number
          id: string
          is_default: boolean
          last4: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bank_name?: string | null
          card_holder: string
          created_at?: string
          expiry_month: number
          expiry_year: number
          id?: string
          is_default?: boolean
          last4: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bank_name?: string | null
          card_holder?: string
          created_at?: string
          expiry_month?: number
          expiry_year?: number
          id?: string
          is_default?: boolean
          last4?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          id: string
          total_earned: number
          total_withdrawn: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          total_withdrawn?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      withdrawal_requests: {
        Row: {
          amount: number
          card_id: string
          created_at: string
          id: string
          note: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          card_id: string
          created_at?: string
          id?: string
          note?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          card_id?: string
          created_at?: string
          id?: string
          note?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withdrawal_requests_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "payment_cards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      credit_wallet: {
        Args: { _amount: number; _user_id: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      legal_document_status: "uploaded" | "processing" | "ready" | "failed"
      legal_document_type:
        | "criminal_code_uz"
        | "criminal_code_en"
        | "plenum_decision"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      legal_document_status: ["uploaded", "processing", "ready", "failed"],
      legal_document_type: [
        "criminal_code_uz",
        "criminal_code_en",
        "plenum_decision",
        "other",
      ],
    },
  },
} as const
