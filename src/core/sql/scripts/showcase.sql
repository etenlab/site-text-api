CREATE OR REPLACE FUNCTION load_data() RETURNS void as $$
  DECLARE 
    electionId integer;
    appId integer;
    siteTextId integer;
  BEGIN -- Insert language skill
    INSERT INTO admin.language_skills(
        user_id,
        language_table,
        language_id,
        skill_level
      )
    VALUES(
        'user_id',
        'iso_639_6',
        (
          SELECT id
          FROM iso_639_3
          WHERE iso_639_3 = 'eng'
        ),
        '5'
      );

    -- Insert app
    INSERT INTO admin.app_list(app_name)
    VALUES('app_item') RETURNING id INTO appId;

    -- Insert site texts
    INSERT INTO admin.site_text_keys(
        app,
        language_table,
        language_id,
        site_text_key,
        description
      )
    VALUES(
        appId,
        'iso_639_3',
        (
          SELECT id
          FROM iso_639_3
          WHERE iso_639_3 = 'eng'
        ),
        'site_text_key',
        'description'
      ),
      (
        appId,
        'iso_639_3',
        (
          SELECT id
          FROM iso_639_3
          WHERE iso_639_3 = 'eng'
        ),
        'site_text_key 2',
        'description'
      );

     SELECT id INTO siteTextId
     FROM admin.site_text_keys
     WHERE site_text_key = 'site_text_key';
     
    -- Insert site text translations
    INSERT INTO admin.site_text_translations(
        site_text,
        language_table,
        language_id,
        user_id,
        site_text_translation,
        description_translation
      )
    VALUES(
        siteTextId,
        'iso_639_3',
        (
          SELECT id
          FROM iso_639_3
          WHERE iso_639_3 = 'eng'
        ),
        'user_id',
        'site text translation',
        'description translation'
      ),
      (
        siteTextId,
        'iso_639_3',
        (
          SELECT id
          FROM iso_639_3
          WHERE iso_639_3 = 'eng'
        ),
        'user_id',
        'site text translation 2',
        'description translation 2'
      ),
      (
        siteTextId,
        'iso_639_3',
        (
          SELECT id
          FROM iso_639_3
          WHERE iso_639_3 = 'eng'
        ),
        'user_id',
        'site text translation 3',
        'description translation 3'
      ),
      (
        siteTextId,
        'iso_639_3',
        (
          SELECT id
          FROM iso_639_3
          WHERE iso_639_3 = 'eng'
        ),
        'user_id',
        'site text translation 4',
        'description translation 4'
      );

    -- voting
    INSERT INTO admin.elections(app_id, name, created_by, table_name, row)
    VALUES(
        appId,
        (
          SELECT site_text_key
          FROM admin.site_text_keys
          WHERE site_text_key = 'site_text_key'
        ),
        'user_id',
        'site_text_keys',
        (
          SELECT id
          FROM admin.site_text_keys
          WHERE site_text_key = 'site_text_key'
        )
      )
    RETURNING id INTO electionId;


    INSERT INTO admin.ballot_entries(election_id, table_name, row, created_by)
    VALUES(
        electionId,
        'site_text_translations',
        (
          SELECT id
          FROM admin.site_text_translations
          WHERE site_text_translation = 'site text translation'
        ),
        'user_id'
      ),
      (
        electionId,
        'site_text_translations',
        (
          SELECT id
          FROM admin.site_text_translations
          WHERE site_text_translation = 'site text translation 2'
        ),
        'user_id'
      ),
      (
        electionId,
        'site_text_translations',
        (
          SELECT id
          FROM admin.site_text_translations
          WHERE site_text_translation = 'site text translation 3'
        ),
        'user_id'
      ),
      (
        electionId,
        'site_text_translations',
        (
          SELECT id
          FROM admin.site_text_translations
          WHERE site_text_translation = 'site text translation 4'
        ),
        'user_id'
      );
  END;
  $$ LANGUAGE plpgsql;


SELECT load_data();