-- schema v1

create table database_version_control (
  id serial primary key,
  version int not null,
  started timestamp default current_timestamp,
  finished timestamp
);

create table users (
  user_id bigserial primary key,
  active bool not null default true,
  email varchar(255) unique not null,
  is_email_verified bool not null default false,
  password varchar(128) not null,
  created_at timestamp not null default current_timestamp
);

-- make room for manually created service accounts
alter sequence users_user_id_seq restart with 100; 

create table avatars_current(
  user_id bigint not null references users(user_id),
  avatar varchar(64) unique not null,
  url varchar(128),
  created_at timestamp not null default current_timestamp,
  primary key (user_id, avatar)
);

create table avatars_history(
  avatar_history_id bigserial primary key,
  user_id bigint not null references users(user_id),
  avatar varchar(64) not null,
  url varchar(128),
  created_at timestamp not null,
  changed_at timestamp not null default current_timestamp
);

create type token_type as enum (
  'Confirm',
  'Deny'
);

create table tokens (
  token_id bigserial primary key,
  user_id bigint references users(user_id),
  created_at timestamp not null default current_timestamp,
  token text
);

create index on tokens(token);
create index on tokens(user_id, token);

create table email_tokens(
  token varchar(64) primary key,
  user_id bigint not null references users(user_id),
  type token_type not null,
  created_at timestamp not null default current_timestamp
);

create table reset_tokens(
  token varchar(64) primary key,
  user_id bigint not null references users(user_id),
  created_at timestamp not null default current_timestamp
);

create table websocket_sessions (
  websocket_session_id varchar(64) not null primary key,
  token varchar(512) not null, -- one to many
  user_id bigint references users(user_id),
  created_at timestamp not null default current_timestamp
);

create index on sessions (server_ip);
create index on sessions (user_id);

create type email_sent_type as enum (
  'Register',
  'PasswordReset'
);

create type email_response_type as enum (
  'Bounce',
  'Complaint',
  'Delivery'
);

create table emails_sent (
  email_sent_id bigserial primary key,
  email varchar(255) not null,
  message_id varchar(64) not null,
  type email_sent_type not null,
  response email_response_type,
  created_at timestamp not null default current_timestamp
);

create index on emails_sent (message_id);

create table emails_blocked (
  email varchar(255) primary key,
  created_at timestamp not null default current_timestamp
);

create table notifications (
  notification_id bigserial primary key,
  user_id bigint not null references users(user_id),
  is_notified bool not null default false,
  text text,
  created_at timestamp not null default current_timestamp
);

create index on notifications (user_id, is_notified);