import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const isTablet = width >= 768;

export function responsiveSize(phone, tablet) {
  return isTablet ? tablet : phone;
}

export function responsivePadding() {
  return isTablet ? 32 : 16;
}

export function responsiveSpacing() {
  return isTablet ? 24 : 12;
}
