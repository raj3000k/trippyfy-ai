import Login from "@/components/Login";
import { auth } from "@/config/FirebaseConfig";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const user = auth.currentUser;
  useEffect(() => {
    // console.log(user);
  }, []);
  return <View>{user ? <Redirect href={"/MyTrip"} /> : <Login />}</View>;
}
