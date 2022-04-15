import { CommonActions } from "@react-navigation/native";

export const navigateWithReset = (navigation, screen, params = undefined) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: screen,
          params: params,
        },
      ],
    })
  );
};
