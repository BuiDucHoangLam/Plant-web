import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SpecieCreateForm = ({
  handleChange,
  handleSubmit,
  values,
  handleRowAddClick,
  handleFamiliaChange,
  showGenus,
  genusOptions,
  handleOrdoChange,
  handleRowChange,
  coordinates,
  familiaOptions,
  showFamilia,
  handleSynonymsChange,

  handleRowRemoveClick,

  handleSaveCoord,
}) => {
  const { t } = useTranslation();
  const [map, setMap] = useState(false);

  const {
    name,
    vnName,
    enName,
    enDescription,
    enDistribution,
    enSource,
    enValue,
    ordoList,
    synonymsList,
    description,
    value,
    distribution,
    source,
  } = values;

  const handleToggle = () => {
    handleSaveCoord();
    if (map) setMap(false);
    else setMap(true);
  };
  return (
    <form
      className="form__mobile"
      onSubmit={handleSubmit}
      style={{ background: "none" }}
    >
      <div className="form-group">
        <label>{t("specie")}</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>{t("ordo")}</label>
        <select
          type="text"
          name="ordo"
          className="form-control"
          onChange={handleOrdoChange}
        >
          <option>{t("chooseOrdo")}</option>
          {ordoList.length > 0 &&
            ordoList.map((o) => (
              <option key={o._id} value={o._id}>
                {o.name}
              </option>
            ))}
        </select>
      </div>

      {showFamilia && (
        <div className="form-group">
          <label>{t("familia")}</label>
          <select
            type="text"
            name="familia"
            className="form-control"
            onChange={handleFamiliaChange}
          >
            <option>{t("chooseFamilia")}</option>
            {familiaOptions.length > 0 &&
              familiaOptions.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {showGenus && (
        <div className="form-group">
          <label>{t("genus")}</label>
          <select
            type="text"
            name="genus"
            className="form-control"
            onChange={handleChange}
          >
            <option>{t("chooseGenus")}</option>
            {genusOptions.length > 0 &&
              genusOptions.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label>{t("synonyms")}</label>
        <input
          type="text"
          name="synonymsList"
          className="form-control"
          value={synonymsList}
          onChange={handleSynonymsChange}
        />
      </div>

      <div id="coordField">
        <div className="form-group coord-form">
          <div className="row">
            <div className="col-md-10 l-10">
              <div style={{ textAlign: "center" }}>
                {" "}
                <label>{t("coordinate")}</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5 l-5">
              <div style={{ textAlign: "center" }}>{t("latitude")}</div>
            </div>
            <div className="col-md-5 l-5">
              <div style={{ textAlign: "center" }}>{t("longitude")}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {coordinates.map((x, i) => {
          return (
            <div className="row" key={i}>
              <div className="col-md-5 l-5">
                <input
                  className="form-control"
                  name="latitude"
                  value={x.latitude}
                  onChange={(e) => handleRowChange(e, i)}
                />
              </div>
              <div className="col-md-5 l-5">
                <input
                  name="longitude"
                  value={x.longitude}
                  onChange={(e) => handleRowChange(e, i)}
                  className="form-control"
                />
              </div>
              <div className="mt-1 col-md-2 l-2">
                <div className="btn-box">
                  {coordinates.length !== 1 && (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleRowRemoveClick(i)}
                    >
                      X??a
                    </button>
                  )}
                </div>
              </div>
              {coordinates.length - 1 === i && (
                <>
                  <br />
                  <div
                    id="add-field"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      className="btn btn-outline-info"
                      id="addCoord"
                      onClick={handleRowAddClick}
                    >
                      {" "}
                      Th??m{" "}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="row">
        <div className="col-md-6">
          <div style={{ textAlign: "center" }}>{t("vietnam")}</div>
          <div className="form-group">
            <label>{t("name")}</label>
            <input
              type="text"
              name="vnName"
              className="form-control"
              value={vnName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>{t("description")}</label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              value={description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>{t("useValue")}</label>
            <textarea
              type="text"
              name="value"
              className="form-control"
              value={value}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>{t("distribution")}</label>
            <textarea
              type="text"
              name="distribution"
              className="form-control"
              value={distribution}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>{t("source")}</label>
            <textarea
              type="text"
              name="source"
              className="form-control"
              value={source}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div style={{ textAlign: "center" }}>{t("english")} </div>

          <div className="form-group">
            <label> </label>
            <label className="show-title__child">{t("name")}</label>

            <input
              style={{ marginTop: "8px" }}
              type="text"
              name="enName"
              className="form-control"
              value={enName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label> </label>
            <label className="show-title__child">{t("description")}</label>
            <textarea
              style={{ marginTop: "8px" }}
              type="text"
              name="enDescription"
              className="form-control"
              value={enDescription}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label> </label>
            <label className="show-title__child">{t("useValue")}</label>
            <textarea
              style={{ marginTop: "8px" }}
              type="text"
              name="enValue"
              className="form-control"
              value={enValue}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label> </label>
            <label className="show-title__child">{t("distribution")}</label>
            <textarea
              style={{ marginTop: "8px" }}
              type="text"
              name="enDistribution"
              className="form-control"
              value={enDistribution}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label> </label>
            <label className="show-title__child">{t("source")}</label>
            <textarea
              style={{ marginTop: "8px" }}
              type="text"
              name="enSource"
              className="form-control"
              value={enSource}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <button
        className="btn btn-sm btn-block btn-outline-primary"
        onClick={handleSubmit}
      >
        {t("complete")}
      </button>
    </form>
  );
};

export default SpecieCreateForm;
