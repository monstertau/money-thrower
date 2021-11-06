create table transactions
(
    id               uuid           default uuid_generate_v4() not null
        constraint transactions_pkey
            primary key,
    user_id          uuid                                      not null
        constraint fk_user
            references users
            on delete cascade,
    wallet_id        uuid                                      not null
        constraint fk_wallet
            references wallets
            on delete cascade,
    cat_id           uuid                                      not null
        constraint fk_cat
            references categories
            on delete cascade,
    amount           numeric(15, 2) default 0,
    note             text,
    transaction_date timestamp      default CURRENT_TIMESTAMP  not null
);

alter table transactions
    owner to monstertau;

