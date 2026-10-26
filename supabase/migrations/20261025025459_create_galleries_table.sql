CREATE TABLE public.galleries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title TEXT NOT NULL,
    image TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT galleries_title_not_empty
        CHECK (length(trim(title)) > 0)
);

CREATE INDEX idx_galleries_created_at
    ON public.galleries (created_at DESC);

CREATE TRIGGER set_galleries_updated_at
    BEFORE UPDATE ON public.galleries
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();
