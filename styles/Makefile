styles_src := $(wildcard ./*.styl) $(wildcard ./**/*.styl)
styles_out := ../static/css/main.css

all: $(styles_out) $(campaign_out) $(eshop_out) $(homepage_out) $(homepage_twistus_out) $(partners_out) $(reasons_out)

$(styles_out): $(styles_src)
	stylus -m main.styl -o $(styles_out)
