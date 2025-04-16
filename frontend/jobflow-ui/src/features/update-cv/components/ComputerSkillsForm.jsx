import InputLabelField from "../../../components/ui/InputLabelField";
import CvReusableList from "./CvReusableList";
import { useFormWithStorage } from "../hooks/useFormWithStorage";
import { computerSkillsSchema } from "../schema/skillsSchema";
import { initialValues } from "../schema/skillsSchema";
import ExpandableSection from "./ui/ExpandableSection";
import Form from "../../../components/ui/Form";
import Button from "../../../components/ui/Button";
import { useStoredData } from "../hooks/useStoredData";
import PropTypes from "prop-types";

function ComputerSkills({ onUpdate, storedComputerSkills }) {
  const localStorageKey = "computerSkillList";
  const {
    formik,
    removeItem: removeComputerSkill,
    list: skillsList,
    setList,
    showError,
  } = useFormWithStorage(localStorageKey, computerSkillsSchema, onUpdate, initialValues);

  useStoredData(localStorageKey, storedComputerSkills, setList);
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
  storedComputerSkills: PropTypes.array,
};

export default ComputerSkills;
