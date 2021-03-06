BEGIN;
--
-- Create model AdultData
--
CREATE TABLE `display_data_adultdata` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY, `age` smallint UNSIGNED NOT NULL, `workclass` varchar(100) NOT NULL, `fnlwgt` integer NOT NULL, `education` varchar(100) NOT NULL, `education_num` integer NOT NULL, `marital_status` varchar(100) NOT NULL, `occupation` varchar(100) NOT NULL, `relationship` varchar(100) NOT NULL, `race` varchar(100) NOT NULL, `sex` varchar(10) NOT NULL, `capital_gain` integer NOT NULL, `capital_loss` integer NOT NULL, `hours_per_week` integer NOT NULL, `native_country` varchar(100) NOT NULL, `salary_per_anum` varchar(100) NOT NULL);
COMMIT;
