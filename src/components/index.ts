// auth
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import SignOutButton from "@/components/auth/SignOutButton";
import ContinueWithGoogleButton from "@/components/auth/ContinueWithGoogleButton";
import SignUpToday from "@/components/auth/SignUpToday";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import AccountTypeSwitcher from "@/components/auth/AccountTypeSwitcher";
// account types
import AccountTypesContainer from "@/components/account-types/AccountTypesContainer";
import {
  CreateEditBuyerForm,
  CreateEditTrainedOperatorForm,
  CreateEditSellerForm,
  CreateAccountTypeForm,
} from "@/components/account-types/forms";
import ServicesContainer from "@/components/account-types/ServicesContainer";
// core
import Header from "@/components/core/Header";
import InfiniteScrollContainer from "@/components/core/InfiniteScrollContainer";
import ActionConfirmationDialog from "@/components/core/ActionConfirmationDialog";
import BaseProviders from "@/components/core/BaseProviders";
import BackButton from "@/components/core/BackButton";
import ButtonAsLink from "@/components/core/ButtonAsLink";
import { DataTable } from "@/components/core/DataTable";
// dashboard
import Dashboard from "@/components/dashboard/Dashboard";
// tractors
import CreateEditTractorForm from "./dashboard/equipment/tractors/CreateEditTractorForm";
// attachments
import CreateEditAttachmentForm from "./dashboard/equipment/attachments/CreateEditAttatchmentForm";
// explore
import TractorsContainer from "./explore/TractorsContainer";
// tasks
import TasksContainer from "@/components/tasks/TasksContainer";
import CreateEditTask from "@/components/tasks/CreateEditTask";
import TasksContainerLoadingSkeleton from "@/components/tasks/TasksContainerLoadingSkeleton";
import TaskActionsDropdown from "@/components/tasks/TaskActionsDropdown";
// ui
import Loader from "./ui/Loader";
// admin
import TasksTable from "./admin/tasks/tasks-table/TasksTable";

export {
  // auth
  SignInForm,
  SignUpForm,
  SignOutButton,
  ContinueWithGoogleButton,
  SignUpToday,
  ForgotPasswordForm,
  ResetPasswordForm,
  AccountTypeSwitcher,
  // account types
  AccountTypesContainer,
  CreateEditBuyerForm,
  CreateEditSellerForm,
  CreateEditTrainedOperatorForm,
  CreateAccountTypeForm,
  ServicesContainer,
  //core
  Header,
  InfiniteScrollContainer,
  ActionConfirmationDialog,
  BaseProviders,
  DataTable,
  BackButton,
  ButtonAsLink,
  // dashboard
  Dashboard,
  // tractors
  CreateEditTractorForm,
  // attachment
  CreateEditAttachmentForm,
  // explore
  TractorsContainer,
  // tasks
  TasksContainer,
  CreateEditTask,
  TasksContainerLoadingSkeleton,
  TaskActionsDropdown,
  // ui
  Loader,
  // admin
  TasksTable,
};
