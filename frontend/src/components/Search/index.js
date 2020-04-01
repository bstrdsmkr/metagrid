import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';

import SearchTag from './SearchTag';
import SearchTable from './SearchTable';
import jsonData from '../../mocks/mock.json';

function fetchResults() {
  // TODO: Call an API instead of mock data
  return JSON.parse(JSON.stringify(jsonData));
}

function Search({
  project,
  textInputs,
  appliedFacets,
  onRemoveTag,
  onClearTags,
  onAddCart,
}) {
  Search.propTypes = {
    project: PropTypes.string.isRequired,
    textInputs: PropTypes.arrayOf(PropTypes.string).isRequired,
    appliedFacets: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRemoveTag: PropTypes.func.isRequired,
    onClearTags: PropTypes.func.isRequired,
    onAddCart: PropTypes.func.isRequired,
  };

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setLoading(true);

    const id = window.setTimeout(() => {
      setResults(fetchResults());
      setLoading(false);
    }, 1000);

    return () => {
      window.clearTimeout(id);
      setLoading(true);
    };
  }, [project, textInputs]);

  const handleSelect = (record, selected, selectedRows, nativeEvent) => {
    setSelected(selectedRows);
  };

  const handleSelectAll = (selected, selectedRows, changeRows) => {
    setSelected(selectedRows);
  };

  return (
    <div>
      {/* Top bar */}
      <Row>
        <h4>Applied Constraints: </h4>
        {project !== '' && <SearchTag input={project}></SearchTag>}

        {appliedFacets !== {} &&
          Object.keys(appliedFacets).map((key, value) => {
            return appliedFacets[key].map((value, index) => {
              return (
                <SearchTag
                  key={index}
                  input={value}
                  onClose={onRemoveTag}
                ></SearchTag>
              );
            });
          })}

        {textInputs.length !== 0 &&
          textInputs.map((input, index) => {
            return (
              <SearchTag
                key={index}
                input={input}
                onClose={onRemoveTag}
              ></SearchTag>
            );
          })}
      </Row>
      {results.length !== 0 && (
        <Button type="link" onClick={() => onClearTags()}>
          Clear All
        </Button>
      )}

      {results.length !== 0 && (
        <Button onClick={() => onAddCart(selected)}>
          Add Selected to Cart
        </Button>
      )}

      <Row gutter={[24, 16]} justify="space-around">
        <Col lg={24}>
          <SearchTable
            loading={loading}
            results={results}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Search;
