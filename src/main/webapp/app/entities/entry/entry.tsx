import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './entry.reducer';
import { IEntry } from 'app/shared/model/entry.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Entry = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const entryList = useAppSelector(state => state.entry.entities);
  const loading = useAppSelector(state => state.entry.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="entry-heading" data-cy="EntryHeading">
        <Translate contentKey="blogApp.entry.home.title">Entries</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="blogApp.entry.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="blogApp.entry.home.createLabel">Create new Entry</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {entryList && entryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="blogApp.entry.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="blogApp.entry.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="blogApp.entry.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="blogApp.entry.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="blogApp.entry.blog">Blog</Translate>
                </th>
                <th>
                  <Translate contentKey="blogApp.entry.tag">Tag</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {entryList.map((entry, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${entry.id}`} color="link" size="sm">
                      {entry.id}
                    </Button>
                  </td>
                  <td>{entry.title}</td>
                  <td>{entry.content}</td>
                  <td>{entry.date ? <TextFormat type="date" value={entry.date} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{entry.blog ? <Link to={`blog/${entry.blog.id}`}>{entry.blog.name}</Link> : ''}</td>
                  <td>
                    {entry.tags
                      ? entry.tags.map((val, j) => (
                          <span key={j}>
                            <Link to={`tag/${val.id}`}>{val.name}</Link>
                            {j === entry.tags.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${entry.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${entry.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${entry.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="blogApp.entry.home.notFound">No Entries found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Entry;
