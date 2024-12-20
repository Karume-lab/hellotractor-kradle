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
import LinkAsButton from "@/components/core/LinkAsButton";
import FileUploadDropZone from "./core/FileUploadDropZone";
import { DataTable } from "@/components/core/DataTable";
import BaseSideBar from "./core/BaseSideBar";
import AuthenticatedHeader from "./core/AuthenticatedHeader";
// dashboard
import Dashboard from "@/components/dashboard/Dashboard";
// tractors
import CreateEditTractorForm from "./dashboard/equipment/tractors/CreateEditTractorForm";
import TractorsTable from "./dashboard/equipment/tractors/TractorsTable";
// attachments
import CreateEditAttachmentForm from "./dashboard/equipment/attachments/CreateEditAttatchmentForm";
import AttachmentsTable from "./dashboard/equipment/attachments/AttachmentsTable";
// explore
import TractorsContainer from "./explore/TractorsContainer";
// ui
import Loader from "./ui/Loader";
// admin
import DealerServicesContainer from "./account-types/DealerServicesContainer";
import TrainedOperatorServicesContainer from "./account-types/TrainedOperatorServicesContainer";
// chat
import ChatsContainer from "./inbox/ChatsContainer";
// wishlist
import WishlistContainer from "./wishlist/WishlistContainer";
// trained operators
import TrainedOperatorsTable from "./dashboard/equipment/trained-operators/TrainedOperatorsTable";
// dealers
import DealersTable from "./dashboard/equipment/dealers/DealersTable";
// landing page
import HeroSection from "./landing-page/HeroSection";
import Footer from "./landing-page/Footer";
import FeaturedTractorsContainer from "./landing-page/FeaturedTractorsContainer";
import FeaturedAttachmentsContainer from "./landing-page/FeaturedAttachmentsContainer";
// inboxes
import InboxesContainer from "./inbox/InboxesContainer";

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
  LinkAsButton,
  FileUploadDropZone,
  AuthenticatedHeader,
  BaseSideBar,
  // dashboard
  Dashboard,
  // tractors
  CreateEditTractorForm,
  TractorsTable,
  // attachment
  CreateEditAttachmentForm,
  AttachmentsTable,
  // explore
  TractorsContainer,
  // ui
  Loader,
  // admin
  DealerServicesContainer,
  TrainedOperatorServicesContainer,
  // chat
  ChatsContainer,
  // wishlist
  WishlistContainer,
  // trained operators
  TrainedOperatorsTable,
  // dealers
  DealersTable,
  // landing page
  HeroSection,
  Footer,
  FeaturedTractorsContainer,
  FeaturedAttachmentsContainer,
  // inboxes
  InboxesContainer,
};
