import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
 Button, Form, FormGroup, Label, Input, FormText, Alert 
} from 'reactstrap';
import ReactSelect from 'react-select';
import DefaultLayout from '../layouts/Default';

const CreatePhrase = gql`
  mutation CreatePhrase($input: CreatePhraseInput!) {
    createPhrase(input: $input) {
      id
      name
      slug
    }
  }
`;

const AllTopics = gql`
  query allTopics {
    allTopics {
      id
      name
    }
  }
`;

const AllContexts = gql`
  query allContexts {
    allContexts {
      id
      name
    }
  }
`;

const AllTones = gql`
  query allTones {
    allTones {
      id
      name
    }
  }
`;

export default class PhraseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      selectedPartsOfSpeech: null,
      selectedContexts: null,
      selectedTones: null,
      selectedTopics: null,
      CreatePhraseInput: {
        name: '',
        definition: '',
        contextIds: [],
        topicIds: [],
        toneIds: [],
        note: '',
        source: '',
      },
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDefinition = this.handleChangeDefinition.bind(this);
    this.handleChangeTopicIds = this.handleChangeTopicIds.bind(this);
    this.handleChangeContextIds = this.handleChangeContextIds.bind(this);
    this.handleChangeToneIds = this.handleChangeToneIds.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleChangeSource = this.handleChangeSource.bind(this);
  }

  handleChangeName(event) {
    const { CreatePhraseInput } = { ...this.state };
    const currentState = CreatePhraseInput;
    const { value } = event.target;
    currentState.name = value;
    this.setState({ CreatePhraseInput: currentState });
  }

  handleChangeDefinition(event) {
    const { CreatePhraseInput } = { ...this.state };
    const currentState = CreatePhraseInput;
    const { value } = event.target;
    currentState.definition = value;
    this.setState({ CreatePhraseInput: currentState });
  }

  handleChangeTopicIds(selectedTopics) {
    const { CreatePhraseInput } = { ...this.state };
    const currentState = CreatePhraseInput;
    if (selectedTopics) {
      const idArray = selectedTopics.map(item => item.value);
      currentState.topicIds = idArray;
    }
    if (selectedTopics === null) {
      currentState.topicIds = [];
    }
    this.setState({ CreatePhraseInput: currentState });
    this.setState({ selectedTopics });
  }

  handleChangeContextIds(selectedContexts) {
    const { CreatePhraseInput } = { ...this.state };
    const currentState = CreatePhraseInput;
    if (selectedContexts) {
      const idArray = selectedContexts.map(item => item.value);
      currentState.contextIds = idArray;
    }
    if (selectedContexts === null) {
      currentState.contextIds = [];
    }
    this.setState({ CreatePhraseInput: currentState });
    this.setState({ selectedContexts });
  }

  handleChangeToneIds(selectedTones) {
    const { CreatePhraseInput } = { ...this.state };
    const currentState = CreatePhraseInput;
    if (selectedTones) {
      const idArray = selectedTones.map(item => item.value);
      currentState.toneIds = idArray;
    }
    if (selectedTones === null) {
      currentState.toneIds = [];
    }
    this.setState({ CreatePhraseInput: currentState });
    this.setState({ selectedTones });
  }

  handleChangeNote(event) {
    const { CreatePhraseInput } = { ...this.state };
    const currentState = CreatePhraseInput;
    const { value } = event.target;
    currentState.note = value;
    this.setState({ CreatePhraseInput: currentState });
  }

  handleChangeSource(event) {
    const { CreatePhraseInput } = { ...this.state };
    const currentState = CreatePhraseInput;
    const { value } = event.target;
    currentState.source = value;
    this.setState({ CreatePhraseInput: currentState });
  }

  render() {
    const {
      selectedContexts,
      selectedTones,
      selectedTopics,
      CreatePhraseInput,
    } = this.state;
    return (
      <DefaultLayout>
        <Head>
          <title>Create Phrase</title>
        </Head>
        <h1>Add a Phrase</h1>
        <Form onSubmit={e => e.preventDefault()}>
          <FormGroup>
            <Label for="name">Phrase</Label>
            <Input
              type="text"
              name="name"
              value={CreatePhraseInput.name}
              onChange={this.handleChangeName}
              placeholder="Enter phrase"
            />
          </FormGroup>
          <FormGroup>
            <Label for="definition">Definition</Label>
            <Input
              type="textarea"
              name="definition"
              rows="5"
              value={CreatePhraseInput.definition}
              onChange={this.handleChangeDefinition}
              placeholder="What does phrase mean?"
            />
          </FormGroup>
          <FormGroup>
            <Label for="topicIds">Topics</Label>
            <Query query={AllTopics}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <Alert color="danger">{error.message}</Alert>;
                return (
                  <ReactSelect
                    isMulti
                    value={selectedTopics}
                    onChange={this.handleChangeTopicIds}
                    options={data.allTopics.map(item => ({ value: item.id, label: item.name }))}
                  />
                );
              }}
            </Query>
          </FormGroup>
          <FormGroup>
            <Label for="contextIds">Context</Label>
            <Query query={AllContexts}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <Alert color="danger">{error.message}</Alert>;
                return (
                  <ReactSelect
                    isMulti
                    value={selectedContexts}
                    onChange={this.handleChangeContextIds}
                    options={data.allContexts.map(item => ({ value: item.id, label: item.name }))}
                  />
                );
              }}
            </Query>
          </FormGroup>
          <FormGroup>
            <Label for="toneIds">Tone</Label>
            <Query query={AllTones}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <Alert color="danger">{error.message}</Alert>;
                return (
                  <ReactSelect
                    isMulti
                    value={selectedTones}
                    onChange={this.handleChangeToneIds}
                    options={data.allTones.map(item => ({ value: item.id, label: item.name }))}
                  />
                );
              }}
            </Query>
          </FormGroup>
          <FormGroup>
            <Label for="note">Notes</Label>
            <Input
              type="textarea"
              name="note"
              rows="5"
              value={CreatePhraseInput.note}
              onChange={this.handleChangeNote}
              placeholder="Note to self"
            />
          </FormGroup>
          <FormGroup>
            <Label for="source">Source</Label>
            <Input
              type="textarea"
              name="note"
              rows="5"
              value={CreatePhraseInput.source}
              onChange={this.handleChangeSource}
              placeholder="If available, cite specific reference / source"
            />
          </FormGroup>
          <Mutation
            mutation={CreatePhrase}
            variables={{ input: CreatePhraseInput }}
          >
            {(createPhraseMutation, { loading, error, data }) => {
              if (loading) {
                return <Button color="secondary">Loading...</Button>;
              }
              if (error) {
                return (
                  <div>
                    <Button color="primary" onClick={createPhraseMutation}>Submit</Button>
                    <Alert color="danger">
                      Error: {error.message}
                    </Alert>
                  </div>
                );
              }
              if (data) {
                const { createPhrase } = data;
                return (
                  <Alert color="success">
                    Success! View <a href={`/phrase/${createPhrase.slug}`}>{createPhrase.name}</a>  
                  </Alert>
                );
              }
              return (
                <Button color="primary" onClick={createPhraseMutation}>Submit</Button>
              );
            }
            }
          </Mutation>
        </Form>
      </DefaultLayout>
    );
  }
}
