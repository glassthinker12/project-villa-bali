ALTER TABLE public.page_sections
ADD COLUMN type TEXT NOT NULL DEFAULT 'hero';

ALTER TABLE public.page_sections
ADD CONSTRAINT page_sections_type_not_empty
CHECK (length(trim(type)) > 0);