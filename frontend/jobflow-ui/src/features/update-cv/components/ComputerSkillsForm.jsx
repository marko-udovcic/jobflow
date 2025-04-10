import InputLabelField from "../../../components/ui/InputLabelField";
import CvReusableList from "./CvReusableList";
import { useFormWithStorage } from "../hooks/useFormWithStorage";
import { computerSkillsSchema } from "../schema/skillsSchema";
import { initialValues } from "../schema/skillsSchema";
import ExpandableSection from "./ui/ExpandableSection";
import Form from "../../../components/ui/Form";
import Button from "../../../components/ui/Button";
import PropTypes from "prop-types";

function ComputerSkills({ onUpdate }) {
  const localStorageKey = "skillsList";
  const {
    formik,
    removeItem: removeComputerSkill,
    list: skillsList,
    showError,
  } = useFormWithStorage(localStorageKey, computerSkillsSchema, onUpdate, initialValues);

  const renderItem = (skill) => {
    return `${skill.skillName}`;
  };
  return (
    <>
      <ExpandableSection sectionTitle="Computer Skills">
        <CvReusableList
          list={skillsList}
          renderItem={renderItem}
          removeItem={removeComputerSkill}
        />
        <Form onSubmit={formik.handleSubmit}>
          <InputLabelField
            name="skillName"
            labelName="Skill Name"
            type="text"
            formik={formik}
            showError={showError}
            placeholder="Programming, Excel, Word..."
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
ComputerSkills.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default ComputerSkills;
