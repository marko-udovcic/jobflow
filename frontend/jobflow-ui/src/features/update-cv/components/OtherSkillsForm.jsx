import InputLabelField from "../../../components/ui/InputLabelField";
import CvReusableList from "./CvReusableList";
import { useFormWithStorage } from "../hooks/useFormWithStorage";
import { otherSkillsSchema } from "../schema/skillsSchema";
import { initialValues } from "../schema/skillsSchema";
import ExpandableSection from "./ui/ExpandableSection";
import Form from "../../../components/ui/Form";
import Button from "../../../components/ui/Button";
import PropTypes from "prop-types";
import { useStoredData } from "../hooks/useStoredData";

function OtherSkills({ onUpdate, storedOtherSkills }) {
  const localStorageKey = "otherSkillsList";
  const {
    formik,
    removeItem: removeOtherSkill,
    list: otherSkillsList,
    setList,
    showError,
  } = useFormWithStorage(localStorageKey, otherSkillsSchema, onUpdate, initialValues);

  useStoredData(localStorageKey, storedOtherSkills, setList);
  const renderItem = (skill) => {
    return `${skill.skillName}`;
  };
  return (
    <>
      <ExpandableSection sectionTitle="Other Skills">
        <CvReusableList
          list={otherSkillsList}
          renderItem={renderItem}
          removeItem={removeOtherSkill}
        />
        <Form onSubmit={formik.handleSubmit}>
          <InputLabelField
            name="skillName"
            labelName="Skill Name"
            type="text"
            formik={formik}
            showError={showError}
            placeholder="Teamwork, Creativity..."
          />
          <div className="flex justify-end">
            <Button variant="primary" className="mt-6 w-full lg:w-1/4" type={"submit"}>
              Add Experience
            </Button>
          </div>
        </Form>
      </ExpandableSection>
    </>
  );
}
OtherSkills.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  storedOtherSkills: PropTypes.array,
};

export default OtherSkills;
