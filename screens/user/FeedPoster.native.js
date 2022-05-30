import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";

import PrimaryButton from "../../components/PrimaryButton";
import IconButton from "../../components/IconButton";

import patterns from "../../helpers/patterns";
import api from "../../helpers/api";
import { useNavigation } from "@react-navigation/native";

const FeedPoster = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data) => {
    api
      .post("feed/new-post", {
        content: data.content,
      })
      .then((res) => {
        if (res.data.code === 200) {
          navigation.navigate("Feed");
        }
      })
      .catch((err) => {
        const response = JSON.parse(err.response.request._response);
        console.log(response);
      });
  };

  return (
    <View style={styles.inputContainer}>
      <IconButton
        style={styles.goBack}
        color="black"
        icon="arrow-back"
        callback={() => navigation.goBack()}
        size={24}
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Mesajınız boş bırakılamaz",
          },
          minLength: {
            value: 6,
            message: "Mesajınız 6 karakterden az olamaz",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            selectionColor="gray"
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Ne düşünüyorsunuz?"
            multiline={true}
          />
        )}
        name="content"
      />
      <View style={styles.inputActions}>
        <Text style={styles.errorText}>{errors.content?.message}</Text>
        <PrimaryButton
          callback={handleSubmit(onSubmit)}
          style={styles.shareButton}
        >
          <Text style={styles.shareButtonText}>Paylaş</Text>
        </PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  inputActions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    backgroundColor: "#d4d4d4",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    fontSize: 16,
  },
  errorText: {
    width: "100%",
    flex: 1,
    marginLeft: 4,
  },
  shareButton: {
    alignSelf: "flex-end",
    width: "30%",
  },
  shareButtonText: {
    color: "white",
  },
  goBack: {
    alignSelf: "flex-start",
  },
});

export default FeedPoster;
