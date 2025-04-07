import InputLabelField from "../../../components/ui/InputLabelField";
import CvReusableList from "./CvReusableList";
import { useFormWithStorage } from "../hooks/useFormWithStorage";
import { otherSkillsSchema } from "../schema/skillsSchema";
import { initialValues } from "../schema/skillsSchema";
import ExpandableSection from "./ui/ExpandableSection";
import Form from "../../../components/ui/Form";
import Button from "../../../components/ui/Button";
import PropTypes from "prop-types";

function OtherSkills({ onUpdate }) {
  const localStorageKey = "skillsList";
  const {
    formik,
    removeItem: removeOtherSkill,
    list: otherSkillsList,
    showError,
  } = useFormWithStorage(localStorageKey, otherSkillsSchema, onUpdate, initialValues);

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
};

export default OtherSkills;
