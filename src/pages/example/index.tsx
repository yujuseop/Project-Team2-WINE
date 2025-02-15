import MyReviews from "@/pages/myprofile/components/MyReviews";
import CustomSelect from "@/components/CustomSelect";

const options = ["삭제하기", "수정하기"];

export default function MyProfile() {
  return (
    <div>
      <CustomSelect options={options} />
      <MyReviews />
    </div>
  );
}
