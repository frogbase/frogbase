import * as dotenv from 'dotenv';
dotenv.config();

class Sql {

    dbExists = `SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = '${process.env.POSTGRES_DB}');`;

    dbCreate = `CREATE DATABASE ${process.env.POSTGRES_DB}`;

    tableCreate = `
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

        -- Create the AFTER INSERT trigger
        CREATE OR REPLACE TRIGGER set_created_timestamp_trigger AFTER
        INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION set_created_timestamp();

        -- Create the AFTER UPDATE trigger
        CREATE OR REPLACE TRIGGER set_updated_timestamp_trigger AFTER
        UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION set_updated_timestamp();

        -- Create the AFTER INSERT trigger
        CREATE OR REPLACE TRIGGER set_created_timestamp_trigger AFTER
        INSERT ON public."resetTokens" FOR EACH ROW EXECUTE FUNCTION set_created_timestamp();

        -- Create the AFTER UPDATE trigger
        CREATE OR REPLACE TRIGGER  set_updated_timestamp_trigger AFTER
        UPDATE ON public."resetTokens" FOR EACH ROW EXECUTE FUNCTION set_updated_timestamp();

        -- Create the AFTER INSERT trigger
        CREATE OR REPLACE TRIGGER set_created_timestamp_trigger AFTER
        INSERT ON public.posts FOR EACH ROW EXECUTE FUNCTION set_created_timestamp();

        -- Create the AFTER UPDATE trigger
        CREATE OR REPLACE TRIGGER set_updated_timestamp_trigger AFTER
        UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION set_updated_timestamp();

        -- Indexes
        CREATE UNIQUE INDEX IF NOT EXISTS users_unique_lower_email_idx ON public.users (lower(email));
        CREATE UNIQUE INDEX IF NOT EXISTS users_unique_lower_username_idx ON public.users (lower(username));

        CREATE INDEX IF NOT EXISTS posts_creator_idx ON public.posts (creator);
`;
}

export default new Sql();