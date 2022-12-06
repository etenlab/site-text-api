-- Insert language skill
INSERT INTO admin.language_skills(user_id, language_table, language_id, skill_level)
VALUES('user_id', 'iso_639_6', (SELECT id FROM iso_639_3 WHERE iso_639_3 = 'eng'), '5');

-- Insert app
INSERT INTO admin.app_list(app_name)
VALUES('app_item');

-- Insert site text
INSERT INTO admin.site_text_keys(app, language_table, language_id, site_text_key, description)
VALUES(
  (SELECT id FROM admin.app_list WHERE app_name = 'app_item'),
  'iso_639_3',
  (SELECT id FROM iso_639_3 WHERE iso_639_3 = 'eng'),
  'site_text_key',
  'description'
);

-- Insert site text translation
INSERT INTO admin.site_text_translations(
  site_text, language_table, language_id, user_id, site_text_translation, description_translation)
VALUES(
  (SELECT id FROM admin.site_text_keys WHERE site_text_key = 'site_text_key'),
  'iso_639_3',
  (SELECT id FROM iso_639_3 WHERE iso_639_3 = 'eng'),
  'user_id',
  'site text translation',
  'description translation'
);

INSERT INTO admin.elections(app_id, name, created_by, table_name, row)
VALUES(
  (SELECT id FROM admin.app_list WHERE app_name = 'app_item'), 
  (SELECT site_text_key FROM admin.site_text_keys WHERE site_text_key = 'site_text_key'),
  'user_id', 
  'site_text_keys', 
  (SELECT id FROM admin.site_text_keys WHERE site_text_key = 'site_text_key')
);

INSERT INTO admin.ballot_entries(election_id, table_name, row, created_by)
VALUES(1, 'site_text_translations', 1, 'user_id');
