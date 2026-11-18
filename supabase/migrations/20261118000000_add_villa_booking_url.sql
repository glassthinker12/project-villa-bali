-- Per-villa booking URL (Guesty property page).
alter table public.villas
  add column booking_url varchar;

-- Backfill URL yang sebelumnya hardcoded di about-section.
update public.villas
set booking_url = case slug
  when 'villa-chloe'
    then 'https://seaviewprivatevillas.guestybookings.com/en/properties/68e1c2be52deb400138b499f'
  when 'villa-cara'
    then 'https://seaviewprivatevillas.guestybookings.com/en/properties/68e1c2b709a8d6001009e0cb'
  when 'villa-sofia'
    then 'https://seaviewprivatevillas.guestybookings.com/en/properties/68e1c2b45f90a700130b30a1'
end
where slug in ('villa-chloe', 'villa-cara', 'villa-sofia');
