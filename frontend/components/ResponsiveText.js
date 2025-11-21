import { Text } from "react-native";
import { responsiveSize } from "../lib/responsive";

export default function ResponsiveText({ style, children }) {
  return (
    <Text style={[{ fontSize: responsiveSize(16, 28) }, style]}>
      {children}
    </Text>
  );
}
