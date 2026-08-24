import {View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ImageBackground, ScrollView} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { applyDeliveryPartner } from "./api";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "@/store/store";
import { useEffect } from "react";

const ApplyDeliverySchema = Yup.object().shape({
  vehicleType: Yup.string().required("Vehicle type is required"),
  vehicleNumber: Yup.string()
    .matches(
      /^[A-Z]{2}[- \s]?[0-9]{2}[- \s]?[A-Z]{1,2}[- \s]?[0-9]{4}$/,
      "Enter a valid vehicle number (e.g., RJ-14-AB-1234)"
    )
    .required("Vehicle number is required"),
  licenseNumber: Yup.string()
    .min(8, "License number must be at least 8 characters")
    .max(16, "License number cannot exceed 16 characters")
    .required("Driving license number is required"),
});
export default function ApplyDeliveryPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    // Check if user has already submitted driving/vehicle details
    const hasFilledDetails = Boolean(user?.vehicleNumber && user?.licenseNumber);

    if (hasFilledDetails) {
      if (user?.status === 'approved') {
        router.replace('../index');
      } else {
        // If 'none', 'pending', or 'rejected'
        router.replace('/application-status');
      }
    }
  }, [user]);
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1000&auto=format&fit=crop",
      }}
      className="flex-1"
      resizeMode="cover"
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-center px-6 py-12"
      >
        <View className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
          <BlurView intensity={100} tint="light" className="p-6">
            <Text className="text-3xl font-extrabold text-slate-900 text-center mb-1">
              Partner <Text className="text-primary">Application</Text>
            </Text>
            <Text className="text-sm text-slate-600 text-center mb-6">
              Enter vehicle and license details to become a partner
            </Text>

  
            <Formik
              initialValues={{
                vehicleType: "bike",
                vehicleNumber: "",
                licenseNumber: "",
              }}
              validationSchema={ApplyDeliverySchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const data = await applyDeliveryPartner({
                    vehicle_type: values.vehicleType,
                    vehicle_number: values.vehicleNumber,
                    license_number: values.licenseNumber,
                  });

                  Alert.alert(
                    "Success",
                    data.message || "Application submitted!",
                    [{ text: "OK", onPress: () => router.replace("./application-status") }]
                  );
                } catch (error: unknown) {
                  const errorMessage =
                    error instanceof Error
                      ? error.message
                      : "Failed to submit application";
                  Alert.alert("Submission Error", errorMessage);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View>
                  {/* Vehicle Type Options */}
                  <Text className="text-slate-800 font-semibold mb-2">
                    Vehicle Type
                  </Text>
                  <View className="flex-row gap-2 mb-1">
                    {["bike", "van", "car", "truck"].map((type) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => setFieldValue("vehicleType", type)}
                        className={`flex-1 py-3 rounded-xl border items-center capitalize ${
                          values.vehicleType === type
                            ? "bg-primary border-primary"
                            : "bg-white/80 border-slate-200"
                        }`}
                      >
                        <Text
                          className={`font-bold ${
                            values.vehicleType === type
                              ? "text-white"
                              : "text-slate-700"
                          }`}
                        >
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {touched.vehicleType && errors.vehicleType && (
                    <Text className="text-red-500 text-xs mb-3 font-medium">
                      {errors.vehicleType}
                    </Text>
                  )}

                  <View className="relative pb-5">
                  <Text className="text-slate-800 font-semibold mb-1 mt-3">
                    Vehicle Number
                  </Text>
                  <TextInput
                    className="bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 uppercase"
                    placeholder="RJ-14-AB-1234"
                    placeholderTextColor="#94A3B8"
                    value={values.vehicleNumber}
                    onChangeText={handleChange("vehicleNumber")}
                    onBlur={handleBlur("vehicleNumber")}
                    autoCapitalize="characters"
                  />
                  {touched.vehicleNumber && errors.vehicleNumber ? (
                    <Text className="text-red-500 text-xs mt-1 mb-2 font-medium absolute -bottom-2 left-1">
                      {errors.vehicleNumber}
                    </Text>
                  ) : (
                    <View className="mb-4" />
                  )}
                  </View>
                 
                 <View className="relative pb-7">
                  <Text className="text-slate-800 font-semibold mb-1">
                    Driving License Number
                  </Text>
                  <TextInput
                    className="bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 uppercase"
                    placeholder="DL12345678"
                    placeholderTextColor="#94A3B8"
                    value={values.licenseNumber}
                    onChangeText={handleChange("licenseNumber")}
                    onBlur={handleBlur("licenseNumber")}
                    autoCapitalize="characters"
                  />
                  {touched.licenseNumber && errors.licenseNumber ? (
                    <Text className="text-red-500 text-xs mt-1 mb-4 font-medium absolute -bottom-2 left-2">
                      {errors.licenseNumber}
                    </Text>
                  ) : (
                    <View className="mb-6" />
                  )}
                 </View>
                  {/* Submit Button */}
                  <TouchableOpacity
                    className="bg-dark active:bg-dark-hover rounded-xl py-3.5 items-center shadow-md mt-3"
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text className="text-white text-base font-bold">
                        Submit Details
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </BlurView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}