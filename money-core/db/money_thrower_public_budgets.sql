create table budgets
(
    id         uuid           default uuid_generate_v4() not null
        constraint budgets_pkey
            primary key,
    user_id    uuid                                      not null
        constraint fk_user
            references users
            on delete cascade,
    wallet_id  uuid                                      not null
        constraint fk_wallet
            references wallets
            on delete cascade,
    cat_id     uuid
        constraint fk_cat
            references categories
            on delete set null,
    amount     numeric(15, 2) default 0,
    start_date timestamp      default CURRENT_TIMESTAMP  not null,
    end_date   timestamp      default CURRENT_TIMESTAMP  not null,
    status     integer        default 1
);

alter table budgets
    owner to monstertau;

