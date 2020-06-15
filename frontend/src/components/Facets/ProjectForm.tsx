import React from 'react';
import { Form, Select } from 'antd';
import { QuestionCircleOutlined, SelectOutlined } from '@ant-design/icons';

import Alert from '../Feedback/Alert';
import Button from '../General/Button';
import Popconfirm from '../Feedback/Popconfirm';
import Spin from '../Feedback/Spin';

import { isEmpty } from '../../utils/utils';

const styles = {
  form: { width: '235px' },
};

export type Props = {
  activeProject: Project | {};
  activeFacets: ActiveFacets | {};
  projectsFetched?: {
    results: Project[];
  };
  projectsIsLoading: boolean;
  projectsError?: Error;
  handleProjectForm: (allValues: { [key: string]: string }) => void;
};

const ProjectsForm: React.FC<Props> = ({
  activeProject,
  activeFacets,
  projectsFetched,
  projectsIsLoading,
  projectsError,
  handleProjectForm,
}) => {
  const [projectForm] = Form.useForm();
  /**
   * Reset projectForm based on the activeProject
   */
  React.useEffect(() => {
    projectForm.resetFields();
  }, [projectForm, activeProject]);

  // Note, have to wrap Alert and Spin with Form to suppress warning about
  // projectForm not being bound to a <Form/></Form> Instance
  if (projectsError) {
    return (
      <Form form={projectForm}>
        <Alert
          message="Error"
          description="There was an issue fetching projects. Please contact support for assistance or try again later."
          type="error"
          showIcon
        />
      </Form>
    );
  }

  if (projectsIsLoading) {
    return (
      <Form form={projectForm}>
        <Spin></Spin>
      </Form>
    );
  }

  if (projectsFetched) {
    // Since activeProject is also typed as an empty object ({}), TypeScript forbids accessing the
    // name attribute. In order to bypass this check, uncast activeProject for this single access.
    // https://stackoverflow.https://stackoverflow.com/a/46530838/questions/34274487/property-does-not-exists-on-type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initialValues = { project: (activeProject as Project).name };

    return (
      <div data-testid="project-form">
        <Form
          form={projectForm}
          layout="inline"
          initialValues={initialValues}
          onFinish={handleProjectForm}
          hideRequiredMark
        >
          <Form.Item
            name="project"
            rules={[{ required: true, message: 'Project is required' }]}
          >
            <Select
              data-testid="project-form-select"
              placeholder="Select a project"
              style={styles.form}
              showArrow
            >
              {projectsFetched.results.map(
                (projectObj: Project, index: number) => {
                  return (
                    <Select.Option
                      key={projectObj.name}
                      value={projectObj.name}
                    >
                      <span data-testid={`project_${index}`}>
                        {projectObj.name}
                      </span>
                    </Select.Option>
                  );
                }
              )}
            </Select>
          </Form.Item>
          <Form.Item>
            {!isEmpty(activeProject) && !isEmpty(activeFacets) ? (
              <Popconfirm
                title="Your constraints will be cleared."
                onConfirm={() => projectForm.submit()}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                placement="right"
              >
                <span>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SelectOutlined />}
                  ></Button>
                </span>
              </Popconfirm>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                icon={<SelectOutlined />}
              ></Button>
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
  // Return an empty form
  return <Form form={projectForm}></Form>;
};

export default ProjectsForm;