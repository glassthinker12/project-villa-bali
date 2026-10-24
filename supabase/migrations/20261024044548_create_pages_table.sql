CREATE TABLE public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT pages_title_not_empty
        CHECK (length(trim(title)) > 0),

    CONSTRAINT pages_slug_not_empty
        CHECK (length(trim(slug)) > 0)
);

CREATE INDEX idx_pages_created_at
    ON public.pages (created_at DESC);

CREATE TRIGGER set_pages_updated_at
    BEFORE UPDATE ON public.pages
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();