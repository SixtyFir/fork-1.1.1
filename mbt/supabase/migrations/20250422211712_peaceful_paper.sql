DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'completed_levels'
  ) THEN 
    ALTER TABLE users 
    ADD COLUMN completed_levels integer DEFAULT 0;
  END IF;
END $$;