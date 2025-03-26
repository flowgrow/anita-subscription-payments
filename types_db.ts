export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      a11y_settings: {
        Row: {
          created_at: string
          id: string
          settings: string | null
          settings_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          settings?: string | null
          settings_name: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          settings?: string | null
          settings_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_a11y_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      anita_button_state: {
        Row: {
          created_at: string
          id: string
          settings: string | null
          settings_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          settings?: string | null
          settings_name: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          settings?: string | null
          settings_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_anita_button_state_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_per_device: {
        Row: {
          created_at: string
          id: string
          min_contrast: number | null
          px_per_mm: number | null
          ua: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          min_contrast?: number | null
          px_per_mm?: number | null
          ua: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          min_contrast?: number | null
          px_per_mm?: number | null
          ua?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_assessment_per_device_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_per_user: {
        Row: {
          acuity: number | null
          astigmatism: boolean | null
          cognitiveLoad: Database["public"]["Enums"]["frequency"] | null
          colorblind: number | null
          created_at: string
          disoriented: Database["public"]["Enums"]["frequency"] | null
          id: string
          leftRight: Database["public"]["Enums"]["frequency"] | null
          longTexts: Database["public"]["Enums"]["read_long_texts"] | null
          phoneDistraction: Database["public"]["Enums"]["frequency"] | null
          readAgain: Database["public"]["Enums"]["frequency"] | null
          readAloud: Database["public"]["Enums"]["difficulty"] | null
          readingAid: boolean | null
          readMedium: Database["public"]["Enums"]["read_medium"] | null
          syllableSplitting: Database["public"]["Enums"]["difficulty"] | null
          user_id: string | null
          wordMixup: Database["public"]["Enums"]["frequency"] | null
        }
        Insert: {
          acuity?: number | null
          astigmatism?: boolean | null
          cognitiveLoad?: Database["public"]["Enums"]["frequency"] | null
          colorblind?: number | null
          created_at?: string
          disoriented?: Database["public"]["Enums"]["frequency"] | null
          id?: string
          leftRight?: Database["public"]["Enums"]["frequency"] | null
          longTexts?: Database["public"]["Enums"]["read_long_texts"] | null
          phoneDistraction?: Database["public"]["Enums"]["frequency"] | null
          readAgain?: Database["public"]["Enums"]["frequency"] | null
          readAloud?: Database["public"]["Enums"]["difficulty"] | null
          readingAid?: boolean | null
          readMedium?: Database["public"]["Enums"]["read_medium"] | null
          syllableSplitting?: Database["public"]["Enums"]["difficulty"] | null
          user_id?: string | null
          wordMixup?: Database["public"]["Enums"]["frequency"] | null
        }
        Update: {
          acuity?: number | null
          astigmatism?: boolean | null
          cognitiveLoad?: Database["public"]["Enums"]["frequency"] | null
          colorblind?: number | null
          created_at?: string
          disoriented?: Database["public"]["Enums"]["frequency"] | null
          id?: string
          leftRight?: Database["public"]["Enums"]["frequency"] | null
          longTexts?: Database["public"]["Enums"]["read_long_texts"] | null
          phoneDistraction?: Database["public"]["Enums"]["frequency"] | null
          readAgain?: Database["public"]["Enums"]["frequency"] | null
          readAloud?: Database["public"]["Enums"]["difficulty"] | null
          readingAid?: boolean | null
          readMedium?: Database["public"]["Enums"]["read_medium"] | null
          syllableSplitting?: Database["public"]["Enums"]["difficulty"] | null
          user_id?: string | null
          wordMixup?: Database["public"]["Enums"]["frequency"] | null
        }
        Relationships: [
          {
            foreignKeyName: "public_assessment_per_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_transfer_tokens: {
        Row: {
          created_at: string | null
          session_data: Json
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          session_data: Json
          token: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          session_data?: Json
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_auth_transfer_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      global_settings: {
        Row: {
          answerAdaptations: Json | null
          defaultA11ySettings: Json | null
          defaultReaderSettings: Json | null
          id: number
        }
        Insert: {
          answerAdaptations?: Json | null
          defaultA11ySettings?: Json | null
          defaultReaderSettings?: Json | null
          id?: number
        }
        Update: {
          answerAdaptations?: Json | null
          defaultA11ySettings?: Json | null
          defaultReaderSettings?: Json | null
          id?: number
        }
        Relationships: []
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      reader_settings: {
        Row: {
          created_at: string
          id: string
          settings: string | null
          settings_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          settings?: string | null
          settings_name: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          settings?: string | null
          settings_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_reader_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
        ]
      }
      to_delete: {
        Row: {
          created_at: string
          id: string
        }
        Insert: {
          created_at?: string
          id: string
        }
        Update: {
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_to_delete_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          birthday: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          payment_method: Json | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          birthday?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          payment_method?: Json | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          birthday?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          payment_method?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "public_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      user_assessments: {
        Row: {
          acuity: number | null
          astigmatism: boolean | null
          birthday: string | null
          cognitiveLoad: Database["public"]["Enums"]["frequency"] | null
          colorblind: number | null
          disoriented: Database["public"]["Enums"]["frequency"] | null
          id: string | null
          leftRight: Database["public"]["Enums"]["frequency"] | null
          longTexts: Database["public"]["Enums"]["read_long_texts"] | null
          min_contrast: number | null
          phoneDistraction: Database["public"]["Enums"]["frequency"] | null
          px_per_mm: number | null
          readAgain: Database["public"]["Enums"]["frequency"] | null
          readAloud: Database["public"]["Enums"]["difficulty"] | null
          readingAid: boolean | null
          readMedium: Database["public"]["Enums"]["read_medium"] | null
          syllableSplitting: Database["public"]["Enums"]["difficulty"] | null
          ua: string | null
          wordMixup: Database["public"]["Enums"]["frequency"] | null
        }
        Relationships: [
          {
            foreignKeyName: "public_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty:
        | "very_difficult"
        | "difficult"
        | "neutral"
        | "easy"
        | "very_easy"
      frequency: "very_often" | "often" | "sometimes" | "rarely" | "never"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      read_long_texts: "yes" | "yes_but_difficult" | "no" | "no_too_difficult"
      read_medium: "mostly_digital" | "mostly_print" | "both"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

