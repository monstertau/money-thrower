create table wallet_shares
(
    wallet_id uuid not null
        constraint fk_wallet
            references wallets
            on delete cascade,
    user_id   uuid not null
        constraint fk_user
            references users
            on delete cascade,
    constraint wallet_shares_pkey
        primary key (wallet_id, user_id)
);

alter table wallet_shares
    owner to monstertau;

