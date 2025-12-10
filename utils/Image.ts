import { supabase } from "@/config/SupabaseConfig";
import axios from "axios";
import { decode } from "base64-arraybuffer";

const convertBlobToBase64 = async (url: any): Promise<string> => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      if (typeof base64data === "string") {
        resolve(base64data.split(",")[1]); // Resolve with base64 string if it's a valid string
      }
    };
  });
};

export const getPlaceImageUtil = async (name: any) => {
  try {
    const { data: dta, error } = await supabase.storage
      .from("images")
      .list("new", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
        search: name,
      });
    // console.log("dta", dta);
    if (dta?.length! > 0) {
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(`new/${dta![0].name}`);

        // console.log('public',data.publicUrl)
      return data.publicUrl;
    } else {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      // console.log(response.data.results[0].photos[0].photo_reference);
      const photo_ref = response.data.results[0].photos[0].photo_reference;

      const google_uri=`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_ref}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`

      const base64: string = await convertBlobToBase64(
        google_uri
      );

      const { data, error } = await supabase.storage
        .from("images")
        .upload(`new/${name}.png`, decode(base64), {
          contentType: "image/png",
        });
      // console.log("upload", data, error);

      return google_uri
    }
  } catch (error) {
    // console.log(error);
  }
};
