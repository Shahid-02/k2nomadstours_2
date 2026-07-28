#!/bin/bash
set -e
SRC="public/images/photos"
DST="public/images/optimized"
mkdir -p "$DST"

resize() {
  local src="$1"
  local dst="$2"
  sips -Z 2400 -s format jpeg -s formatOptions 82 "$SRC/$src" --out "$DST/$dst" > /dev/null
  echo "$dst"
}

resize "IMG_9898.JPG" "k2-base-camp-hero.jpg"
resize "IMG_9802.JPG" "k2-base-camp-concordia.jpg"
resize "IMG_9816.JPG" "k2-base-camp-rest-stop.jpg"
resize "IMG_0063.JPG" "k2-base-camp-porter.jpg"

resize "Hon-Pass-And-Rakaposhi-Base-Camp-Trek.jpg" "rakaposhi-hero.jpg"
resize "ultar-peak.jpg" "ultar-peak.jpg"

resize "Patundas-Pass.jpg" "patundas-pass-hero.jpg"
resize "free-photo-of-lake-among-mountains-in-pakistan.jpeg" "borith-lake.jpg"

resize "Morning_Snowfall_and_Majestic_view_of_Nanga_Parbat_from_Fairy_Meadows_Pakistan.jpg" "nanga-parbat-hero.jpg"
resize "Nanga Parbat 2011 privat 148 by Moritz.JPG" "nanga-parbat-rupal-face.jpg"
resize "nanga-parbat-jpg.jpg" "nanga-parbat-diamer.jpg"
resize "IMG_0044.JPG" "nanga-parbat-camp.jpg"

resize "Snow_Lake_Pakistan.jpg" "snow-lake-hero.jpg"
resize "Snow_Lake_under_twilight.jpg" "snow-lake-twilight.jpg"
resize "Looking_East_to_Snow_Lake_-_lookeast.jpg" "snow-lake-east.jpg"
resize "A_nature_s_trap_adjacent_to_Hispar_Pass.jpg" "hispar-pass.jpg"
resize "IMG_0064.JPG" "snow-lake-porter.jpg"

resize "Gondogoro_La.jpg" "gondogoro-la-hero.jpg"
resize "Gondogoro_Pass.JPG" "gondogoro-pass.jpg"
resize "Vigne-Glacier-Pakistan.jpg" "vigne-glacier.jpg"

resize "Fairy_Meadows,_Pakistan.jpg" "fairy-meadows-hero.jpg"
resize "Fairy_Meadows_Cottages,_Pakistan.jpg" "fairy-meadows-cottages.jpg"
resize "Fairy_meadow_gb.jpg" "fairy-meadows-forest.jpg"
resize "Fairy_Meadows_1.jpg" "fairy-meadows-alt.jpg"

resize "Afroze_Numa_(Taseer_Beyg).jpg" "wakhi-elder-shimshal.jpg"
resize "The_view_from_Chafchingol_Pass.jpg" "chafchingol-pass.jpg"

resize "ThalayLaTrek.jpg" "thalle-la-hero.jpg"
resize "nangmah-valley.jpg" "nangmah-valley-hero.jpg"

resize "IMG_8241.JPG" "baltistan-valley-aerial.jpg"
resize "IMG_8302.JPG" "baltistan-hilltop-fort.jpg"

resize "Khaplu_Palace_Skardu,_Gilgit_Baltistan,_Pakistan.jpg" "khaplu-fort.jpg"

resize "1200px-Lahore_Fort_view_from_Baradari.jpg" "lahore-fort.jpg"
resize "Tomb_of_Bibi_Jiwindi.jpg" "tomb-of-bibi-jawindi.jpg"

resize "Passu_Cones,_Karakoram_range,_Gilgit_Baltistan,_Pakistan.jpg" "passu-cones-hero.jpg"
resize "passu-cones.jpg" "passu-cones-alt.jpg"

resize "Pakistan_valley_kalash_people_festival.jpg" "kalash-festival.jpg"
resize "Shandur-Polo-Festivals_kahtours.jpg" "shandur-polo.jpg"

resize "pexels-wasifmehmood997-19442078.jpg" "shangrila-lake.jpg"

resize "58dbaf127baf3.jpg" "loaded-touring-bike.jpg"
resize "1_Group_PakistanChineseborder-KunjerabPass.jpg" "khunjerab-pass-group.jpg"

echo "Done."
