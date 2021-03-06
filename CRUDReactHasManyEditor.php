<?php

namespace CRUD;

use Maghead\Runtime\Model;
use WebAction\Action;
use Exception;
use PJSON\JsSymbol;
use PJSON\JsFunctionCall;
use PJSON\JsNewObject;

trait CRUDReactHasManyEditor
{
    /**
     * itemDesc describes the relationship between data and the placeholder designed in the UI
     * and defines how the cover view should be built
     *
     * @return array
     */
    // NOTE: abstract is removed because
    // abstract public function itemDesc();
    public function itemDesc()
    {
        $controls = [];
        if ($this->canCreate) {
            $controls[] = ['action' => 'create'];
        }
        if ($this->canUpdate) {
            $controls[] = ['action' => 'edit'];
        }
        if ($this->canDelete) {
            $controls[] = ['action' => 'delete'];
        }
        return [ 'controls' => $controls ];
    }


    /**
     * itemViewBuilder could be used when you have custom view builder rather
     * than just itemDesc.
     *
     * note that, the name of the view builder should be the javascript class name.
     *
     * @return string
     */
    public function itemViewBuilder() { return null; }


    /**
     * Build reference info from parent record.
     *
     * @param Model $parentRecord
     * @param string $relationId
     * @return array
     */
    protected function buildRecordReferences(Model $parentRecord, $relationId)
    {
        $parentSchema = $parentRecord->getSchema();
        $relationship = $parentSchema->getRelation($relationId);
        $refs = [];
        $refs[ $relationship['foreign_column'] ] = [
            'record'              => $parentRecord->toArray(),
            'key'                 => $relationship['self_column'],
            'referedRelationship' => $relationship->accessor,
        ];
        return $refs;
    }


    public function buildReactHasManyEditorConfig(Model $parentRecord, $relationId)
    {
        $modelClass = $this->getModelClass();
        $model = new $modelClass();
        $schema = $model->getSchema();

        // The base config
        $config = [
            'title' => $schema->getLabel(),
            'baseUrl' => '/bs/'.$this->crudId, // TODO: remove this dependency, is there a way to predefine this?
            'crudId' => $this->crudId,
            'parentAction' => $parentRecord->id ? 'edit' : 'create',
        ];

        $config['itemDesc'] = $this->itemDesc();

        if ($viewBuilder = $this->itemViewBuilder()) {
            // Translate string class name into JsNewObject class
            if (is_string($viewBuilder)) {
                $config['viewBuilder'] = new JsSymbol($viewBuilder);
            } else {
                $config['viewBuilder'] = $viewBuilder;
            }
        }

        $config['schema'] = ['primaryKey' => $schema->primaryKey];
        $config['references'] = $this->buildRecordReferences($parentRecord, $relationId);

        if ($this->canDelete) {
            // Always delete record by primary key
            $deleteActionClass = $this->getModelActionClass($model, 'Delete');
            $config['delete'] = [
                'action'  => str_replace('\\', '::', $deleteActionClass),
                'confirm' => '確認刪除?',
            ];
        }

        return $config;
    }
}
