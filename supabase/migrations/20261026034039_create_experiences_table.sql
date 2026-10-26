CREATE TABLE public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    bg_image_url TEXT NOT NULL DEFAULT '',
    inner_image_url TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT experiences_title_not_empty
        CHECK (length(trim(title)) > 0)
);

CREATE INDEX idx_experiences_created_at
    ON public.experiences (created_at DESC);

CREATE TRIGGER set_experiences_updated_at
    BEFORE UPDATE ON public.experiences
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();
