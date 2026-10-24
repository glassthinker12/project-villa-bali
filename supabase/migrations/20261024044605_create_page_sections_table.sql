CREATE TABLE public.page_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL
        REFERENCES public.pages(id)
        ON DELETE CASCADE,
    content JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT page_sections_content_object
        CHECK (jsonb_typeof(content) = 'object')
);

CREATE INDEX idx_page_sections_page_id
    ON public.page_sections (page_id);

CREATE TRIGGER set_page_sections_updated_at
    BEFORE UPDATE ON public.page_sections
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();