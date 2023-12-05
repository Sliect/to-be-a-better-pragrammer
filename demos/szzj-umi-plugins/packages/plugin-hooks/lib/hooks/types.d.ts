import { useModal as _useModal } from '@szzj/hooks';
import { useList as _useList } from '@szzj/hooks';
import { useTree as _useTree } from '@szzj/hooks';
import { useForm as _useForm } from '@szzj/hooks';
import { useFetch as _useFetch } from '@szzj/hooks';
import { default as _useTable } from './useTable';

type useModal = typeof _useModal;
type useList = typeof _useList;
type useTree = typeof _useTree;
type useForm = typeof _useForm;
type useFetch = typeof _useFetch;
type useTable = typeof _useTable;

export type { useModal, useList, useTree, useForm, useFetch, useTable };
