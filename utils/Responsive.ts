import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

  const scale = screenWidth/500; // 375 is the base screen width (iPhone 11 Pro for example)

export function normalize(size:any) {
  return Math.round(size * scale);
}