export const createFieldChangeDispatches = (existing, updated, dispatch, actions) => {
  const changes = [];

  if (existing.description !== updated.description) {
    changes.push(() =>
      dispatch(
        actions.updateJobDescription({
          oldDescription: existing.description,
          newDescription: updated.description,
        })
      )
    );
  }

  if (existing.rate !== updated.rate) {
    changes.push(() =>
      dispatch(
        actions.updateJobRate({
          description: updated.description,
          rate: updated.rate,
        })
      )
    );
  }

  if (existing.unit !== updated.unit) {
    changes.push(() =>
      dispatch(
        actions.updateJobUnit({
          description: updated.description,
          unit: updated.unit,
        })
      )
    );
  }

  if (existing.category !== updated.category) {
    changes.push(() =>
      dispatch(
        actions.updateJobCategory({
          description: updated.description,
          category: updated.category,
        })
      )
    );
  }

  return changes;
};