CREATE TABLE public.villas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price_per_night NUMERIC(12, 2) NOT NULL,
    guests INTEGER NOT NULL DEFAULT 1,
    bedrooms INTEGER NOT NULL DEFAULT 1,
    bathrooms INTEGER NOT NULL DEFAULT 1,
    image TEXT NOT NULL DEFAULT '',
    is_active BOOLEAN NOT NULL DEFAULT true,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT villas_name_not_empty
        CHECK (length(trim(name)) > 0),

    CONSTRAINT villas_slug_not_empty
        CHECK (length(trim(slug)) > 0),

    CONSTRAINT villas_price_positive
        CHECK (price_per_night >= 0),

    CONSTRAINT villas_guests_positive
        CHECK (guests > 0),

    CONSTRAINT villas_bedrooms_positive
        CHECK (bedrooms >= 0),

    CONSTRAINT villas_bathrooms_positive
        CHECK (bathrooms >= 0)
);

CREATE INDEX idx_villas_slug
    ON public.villas (slug);

CREATE INDEX idx_villas_is_active
    ON public.villas (is_active);

CREATE TRIGGER set_villas_updated_at
    BEFORE UPDATE ON public.villas
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();
