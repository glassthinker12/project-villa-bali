ALTER TABLE public.villas
    ADD COLUMN IF NOT EXISTS description TEXT,
    ADD COLUMN IF NOT EXISTS facilities JSONB NOT NULL DEFAULT '[]'::JSONB,
    ADD COLUMN IF NOT EXISTS rules JSONB NOT NULL DEFAULT '[]'::JSONB;

ALTER TABLE public.villas
    ADD CONSTRAINT villas_facilities_array
        CHECK (jsonb_typeof(facilities) = 'array'),
    ADD CONSTRAINT villas_rules_array
        CHECK (jsonb_typeof(rules) = 'array');
