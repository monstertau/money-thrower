create table users
(
    id           uuid      default uuid_generate_v4() not null
        constraint users_pkey
            primary key,
    email        varchar                              not null,
    password     varchar                              not null,
    created_time timestamp default CURRENT_TIMESTAMP,
    updated_time timestamp default CURRENT_TIMESTAMP
);

alter table users
    owner to monstertau;

INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('2bc5f1f4-84ad-46e2-a097-9a2d66183f10', 'test', '$2a$14$3CdMuZfoVu9kVd4AbnmZ2exv9mXgQHv1DnfRarIzpwDNJLJJ54agq', '2021-10-19 17:56:21.232991', '2021-10-19 17:56:21.232991');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('fb5dad81-f712-49f0-b7f1-aecd9aff89fa', 'test1', '$2a$14$wo9gyjsXIoMoAE2P/TOyuudGV0mLRGsud71DrKX0QqRJGj4EGxzYq', '2021-10-19 18:01:30.355664', '2021-10-19 18:01:30.355664');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('e1e73e69-612d-4a5b-a578-531993ac34de', 'test1@gmail.com', '$2a$14$8E9cNwN7ukHXLBgHqEyUeOfV2y.BffF6k/otRfnh1gGkeV6Tn.VWS', '2021-10-19 18:20:20.175562', '2021-10-19 18:20:20.175562');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('1cdfc302-e3a2-44b2-b1a9-5854db043920', 'test12@gmail.com', '$2a$14$7mWGJ767YnzhoZ9XC7SssOpKBoWx9zkl5hMo5B.i81Alc6iVcdLti', '2021-10-19 18:26:34.773424', '2021-10-19 18:26:34.773424');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('650dbb0f-28a4-4af0-a220-3dd3dfcdcb3b', 'test122@gmail.com', '$2a$14$UIsmKyPDKAexjZB1PXHU1ulaLQn/4tLTnxJQvZ5.N3koExFDC6pS6', '2021-10-20 16:11:06.991580', '2021-10-20 16:11:06.991580');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('11112091-cb84-4eb2-b58a-5cec298c3020', 'testaaaa@gmail.com', '$2a$14$Smqt/CybXbknFQwO8r2P4.gIY0S05IHkX3B7311hd6rmRJGTpDX8m', '2021-10-20 16:53:04.052082', '2021-10-20 16:53:04.052082');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('6d8ea5fc-ae7a-486b-a93c-4948c5ed99a8', 'test@gmail.com', '$2a$14$hg3we2ScW3wkULEfHheCOO6OoS1OYIcmDqEbYIajamWLFStN0hBxu', '2021-10-22 03:35:51.712754', '2021-10-22 03:35:51.712754');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('d7c98d03-f07c-48d7-bcd2-b25aa3469dde', 'dominhthong99@gmail.com', '$2a$14$8CTP74ZubfGG4B773Gyljuye3GU9sx.4lbrGg1FUtnRHu0.gBSrdG', '2021-10-22 06:42:29.244796', '2021-10-22 06:42:29.244796');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('79c9f02d-821b-4470-b04f-605512805602', 'dungsieuvip2012@gmail.com', '$2a$14$9h1d4PMX5WvQX7FTf1xJDelaSrSLKqebWxIT0Ocu58V.CR5tXlQru', '2021-10-24 09:17:11.546957', '2021-10-24 09:17:11.546957');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('058246d1-8dba-4f6e-a382-f7cf92d163ad', 'trungdungvu172@gmail.com', '$2a$14$9OCfP/bbbgNqeFv.2.WK2utbja1Ce8OTkioAtgW8hdAJSfI2k9fRi', '2021-10-24 14:19:24.188754', '2021-10-24 14:19:24.188754');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('458c8f1c-639b-440c-9693-ca8c9b8dc313', 'vmhoang1999@gmail.com', '$2a$14$BYPAxep3qdfvkF.0bPVcseSajOzG6TIRpkVtSzL5KnSElRJyw5Pkq', '2021-10-24 14:22:55.784613', '2021-10-24 14:22:55.784613');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('ed966ff8-3b25-43fb-8e63-7b4f7d9e82c4', 'testhoang@gmail.com', '$2a$14$5XJkVqQ6MAHIq8o6EAfYtub4e7b4QDyBvJ1MbM9JpkVZsux.GdW1y', '2021-10-28 04:19:19.002894', '2021-10-28 04:19:19.002894');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('6fe7be08-d6ef-46e0-bbf1-ed3cb5b5626d', 'refikVN1@gmail.com', '$2a$14$nG2LvRQJbFjR0Fyv23BYn.IS3JUgisxqaRRICTmYpDcxMY46DRzVW', '2021-10-28 13:55:49.482614', '2021-10-28 13:55:49.482614');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('925e2d97-cff8-48f2-83a0-9b7140edc0fb', 'javstorage01@gmail.com', '$2a$14$szyTiTaH6H3dnlDKr5gPkevL.eENsn4VD3WHbiy9jCDNakm13Sx3y', '2021-10-28 17:09:52.099839', '2021-10-28 17:09:52.099839');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('f0cb66aa-0a19-4e5a-9989-1026cfa08404', 'cfs05066@cuoly.com', '$2a$14$w10gjztYGAarrG.a1y4xWe0ovwcnLME3uv24wLcfZa2.phfCxzGQO', '2021-10-28 17:59:49.013461', '2021-10-28 17:59:49.013461');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('2b25aacc-e65e-47e2-a84f-3c5473229901', 'dlj20058@cuoly.com', '$2a$14$6gLQj9Xofl8WnGeKFooBqO968E3h47iPc2ErLAmR3iesT.ITlLvMy', '2021-10-28 18:40:52.332001', '2021-10-28 18:40:52.332001');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('f7db05c9-4349-4197-8c78-07e1a3133f37', 'thaian229@gmail.com', '$2a$14$XyCuNV.oiy/e2pAVVYmd0uFgs10xwMxlvUwAY5zawS01lyTVaPYeS', '2021-11-04 02:52:50.951022', '2021-11-04 02:52:50.951022');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('eab71dd5-79a0-44ff-8c37-cf9e396f2b87', 'nxhoang99@gmail.com', '$2a$14$.8xcb/c3rth8zTWbHBTuVOgxQixMrsXdpYAlAZgYWkHsw.T.liQ3a', '2021-10-28 15:06:57.321224', '2021-10-28 15:06:57.321224');
INSERT INTO public.users (id, email, password, created_time, updated_time) VALUES ('00000000-0000-0000-0000-000000000000', 'admin@admin.com', '1', null, '2021-11-04 17:32:42.738881');