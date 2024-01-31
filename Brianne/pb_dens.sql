create table pb_dens (
	Record serial,
	denID integer,
	Spring_year integer,
	Data_source VARCHAR(50),
	Discovery_method VARCHAR(50),
	Latitude real,
	Longitude real,
	Confirmation VARCHAR(50),
	Substrate VARCHAR(50),
	Position_method VARCHAR(50),
	Horizontal_error_m VARCHAR(50)
);

select * from pb_dens