create table wallets
(
    id          uuid           default uuid_generate_v4() not null
        constraint wallets_pkey
            primary key,
    user_id     uuid                                      not null
        constraint fk_user
            references users
            on delete cascade,
    wallet_name varchar                                   not null,
    type        integer                                   not null,
    currency    varchar,
    balance     numeric(15, 2) default 0,
    icon        varchar
);

alter table wallets
    owner to monstertau;

INSERT INTO public.wallets (id, user_id, wallet_name, type, currency, balance, icon) VALUES ('f620b494-5709-41ef-97d8-83a4e98f9ada', '650dbb0f-28a4-4af0-a220-3dd3dfcdcb3b', 'hehe', 1, 'VND', 0.00, 'mua_sam');
INSERT INTO public.wallets (id, user_id, wallet_name, type, currency, balance, icon) VALUES ('95ebaf25-9b0b-4f3f-9bbf-fc21750829f4', '650dbb0f-28a4-4af0-a220-3dd3dfcdcb3b', 'test', 1, 'VND', 1500000.00, 'mua_sam');
INSERT INTO public.wallets (id, user_id, wallet_name, type, currency, balance, icon) VALUES ('95ebaf25-9b0b-4f3f-9bbf-fc21750829f5', 'eab71dd5-79a0-44ff-8c37-cf9e396f2b87', 'hoang', 1, 'VND', 1500000.00, 'mua_sam');