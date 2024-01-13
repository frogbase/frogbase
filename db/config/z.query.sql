CREATE DATABASE frogbase;

\c frogbase;

-- users table
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY NOT NULL,
    username character varying(50) UNIQUE NOT NULL,
    email character varying(100) UNIQUE NOT NULL,
    password character varying(200),
    name character varying(100) NOT NULL,
    avatar character varying(200),
    created TIMESTAMP with time zone DEFAULT CURRENT_TIMESTAMP,
    updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- resetTokens table
CREATE TABLE IF NOT EXISTS public."resetTokens" (
    id SERIAL PRIMARY KEY NOT NULL,
    email character varying NOT NULL,
    token character varying NOT NULL,
    used boolean DEFAULT false NOT NULL,
    expiration timestamp without time zone,
    created TIMESTAMP with time zone DEFAULT CURRENT_TIMESTAMP,
    updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- logs table
CREATE TABLE IF NOT EXISTS public."logs" (
    id SERIAL PRIMARY KEY NOT NULL,
    status character varying,
    method character varying,
    url character varying,
    server character varying,
    client character varying,
    agent character varying,
    meta character varying,
    created TIMESTAMP with time zone DEFAULT CURRENT_TIMESTAMP,
    updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id SERIAL PRIMARY KEY NOT NULL,
    title character varying(100) NOT NULL,
    description text NOT NULL,
    image character varying(200),
    creator integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    updator integer REFERENCES users(id) ON DELETE CASCADE,
    created TIMESTAMP with time zone DEFAULT CURRENT_TIMESTAMP,
    updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to set created timestamp on INSERT
CREATE OR REPLACE FUNCTION set_created_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.created = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to set updated timestamp on UPDATE
CREATE OR REPLACE FUNCTION set_updated_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the AFTER INSERT trigger for users table
CREATE OR REPLACE TRIGGER set_created_timestamp_trigger AFTER
INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION set_created_timestamp();

-- Create the AFTER UPDATE trigger for users table
CREATE OR REPLACE TRIGGER set_updated_timestamp_trigger AFTER
UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION set_updated_timestamp();

-- Create the AFTER INSERT trigger for resetTokens table
CREATE OR REPLACE TRIGGER set_created_timestamp_trigger AFTER
INSERT ON public."resetTokens" FOR EACH ROW EXECUTE FUNCTION set_created_timestamp();

-- Create the AFTER UPDATE trigger for resetTokens table
CREATE OR REPLACE TRIGGER  set_updated_timestamp_trigger AFTER
UPDATE ON public."resetTokens" FOR EACH ROW EXECUTE FUNCTION set_updated_timestamp();

-- Create the AFTER INSERT trigger for posts table
CREATE OR REPLACE TRIGGER set_created_timestamp_trigger AFTER
INSERT ON public.posts FOR EACH ROW EXECUTE FUNCTION set_created_timestamp();

-- Create the AFTER UPDATE trigger for posts table
CREATE OR REPLACE TRIGGER set_updated_timestamp_trigger AFTER
UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION set_updated_timestamp();

-- Create the AFTER INSERT trigger for logs table
CREATE OR REPLACE TRIGGER set_created_timestamp_trigger AFTER
INSERT ON public."logs" FOR EACH ROW EXECUTE FUNCTION set_created_timestamp();

-- Create the AFTER UPDATE trigger for logs table
CREATE OR REPLACE TRIGGER set_updated_timestamp_trigger AFTER
UPDATE ON public."logs" FOR EACH ROW EXECUTE FUNCTION set_updated_timestamp();

-- Trigger function to delete the oldest log if the count exceeds 250
CREATE OR REPLACE FUNCTION delete_oldest_log_trigger() RETURNS TRIGGER AS $$
BEGIN
    -- Check if the total number of logs exceeds the limit (250)
    IF (SELECT COUNT(*) FROM public."logs") > 250 THEN
        -- Delete the oldest log
        DELETE FROM public."logs"
        WHERE id = (SELECT id FROM public."logs" ORDER BY created ASC LIMIT 1);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the AFTER INSERT trigger for logs table
CREATE OR REPLACE TRIGGER delete_oldest_log_trigger AFTER 
INSERT ON public."logs" FOR EACH ROW EXECUTE FUNCTION delete_oldest_log_trigger();

-- Indexes
CREATE UNIQUE INDEX IF NOT EXISTS users_unique_lower_email_idx ON public.users (lower(email));
CREATE UNIQUE INDEX IF NOT EXISTS users_unique_lower_username_idx ON public.users (lower(username));

CREATE INDEX IF NOT EXISTS posts_creator_idx ON public.posts (creator);
CREATE INDEX IF NOT EXISTS posts_updator_idx ON public.posts (updator);

CREATE INDEX IF NOT EXISTS logs_user_idx ON public."logs" (client);
CREATE INDEX IF NOT EXISTS logs_server_idx ON public."logs" (server);

