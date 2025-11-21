import { View } from "react-native";
import { responsivePadding } from "../lib/responsive";

export default function ResponsiveView({ style, children }) {
  return (
    <View style={[{ padding: responsivePadding() }, style]}>{children}</View>
  );
}
