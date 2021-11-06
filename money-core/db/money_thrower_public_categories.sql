create table categories
(
    id            uuid default uuid_generate_v4() not null
        constraint categories_pkey
            primary key,
    parent_cat_id uuid
        constraint fk_parent_cat
            references categories
            on delete set null,
    owner_id      uuid default '00000000-0000-0000-0000-000000000000'::uuid
        constraint fk_owner
            references users
            on delete cascade,
    type          integer                         not null,
    cat_name      varchar                         not null,
    icon          varchar
);

alter table categories
    owner to monstertau;

INSERT INTO public.categories (id, parent_cat_id, owner_id, type, cat_name, icon) VALUES ('95ebaf25-9b0b-4f3f-9bbf-fc21750829f7', null, 'eab71dd5-79a0-44ff-8c37-cf9e396f2b87', 1, 'cat 2', 'icon1');
INSERT INTO public.categories (id, parent_cat_id, owner_id, type, cat_name, icon) VALUES ('6f010a17-e819-49c3-990b-65592dc690bc', null, '00000000-0000-0000-0000-000000000000', 2, 'cat 2', 'icon1');