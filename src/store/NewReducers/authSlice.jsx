//src/store/NewReducers/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../api/apiClient';
import {getDecryptedCookie, setEncryptedCookie} from "../../Utils/secureCookie"
// import { resendEmailFailure } from './PospSignUpInSlice';
import Logger from '../../api/Logger';
import Cookies from "js-cookie"
const initialState = {

  isAuthenticated: false,
  authToken: null,
  user: null,
  loading: false,
  error: null,
  success: false,
  createSuccess: false,
  questionSuccess: false,
  posp: null,
  training: null,
  examQuestions: [],
  allPosp: [],
  loginError: null,
  signupError: null,
  createError: null,
  submitresponse: null,
  message: null,
  resendMessage: null,
  resendSuccess: false,
  emailVerificationLoading: false,
  emailVerificationError: null,
  emailVerified: false,
  passwordResetLoading: false,
  passwordResetError: null,
  passwordResetSuccess: false,
  sendEmailSuccess: false,
  sendEmailError: null,
  sendEmailLoading: false,
};
// Helper function to get user info for logging
const getUserInfoForLogging = () => {
  try {
    const userInfo = getDecryptedCookie("user");
    return {
      userId: userInfo?.id,
      email: userInfo?.email,
      name: userInfo?.name,
      role: userInfo?.role
    };
  } catch {
    return { userId: null, email: null , name: null, role: null };
  }
};


// Helper function to handle API errors
const handleApiError = (error, action) => {
  let errorMessage = "Something went wrong";
  errorMessage=error;
  // if (error.response?.data?.message) {
  //   errorMessage = error.response.data.message;
  // } else if (error.response?.data?.errors?.email) {
  //   errorMessage = error.response.data.errors.email[0];
  // } else if (error.message) {
  //   errorMessage = error.message;
  // }
    // Log error with user context
  const userInfo = getUserInfoForLogging();  
  return errorMessage;
}
// Helper function to log user actions
const logUserAction = (action, details = {}) => {
  const userInfo = getUserInfoForLogging();
};
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await apiClient.auth.login(data);
      console.log("token in slice",res)
      const token = res.data?.token;
      const user = res.data?.user;
      if (token) {
        await apiClient.setAuthData(token, user);
      }

      return res.data;
    } catch (err) {
      const errorMessage = handleApiError(err?.data, "Login");
      // Log failed login attempt
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiClient.auth.register(userData);
      // Enhanced registration logging
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Signup");      
      return rejectWithValue(errorMessage);
    }
  }
);

// Resend Email Verification
export const resendEmailVerification = createAsyncThunk(
  "auth/resendEmailVerification",
  async (token, { rejectWithValue }) => {
    try {
      let userInfo = getUserInfoForLogging();
      let email = userInfo.email;
      const response = await apiClient.auth.verifyEmail({ token });
      
      if (response.data.message) {
        return { success: true, message: response.data.message };
      }
      
      throw new Error("Unexpected response");
    } catch (error) {
      const errorMessage = handleApiError(error, "Resend email");
      return rejectWithValue(errorMessage);
    }
  }
);


// ============================= NOT UPDATED other chained files BELOW THIS LINE =============================//


// export const clearResendStatus = () => (dispatch) => {
//   // dispatch(pospSignUpInSlice.actions.clearResendStatus());
// };


// Verify User Document
export const verifyUserDocument = createAsyncThunk(
  "auth/verifyUserDocument",
  async ({ pospId, formDataObj }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      // Log document submission attempt
      const documentTypes = Object.keys(formDataObj)
        .filter(k => k.includes('document') || k.includes('file'))
        .join(', ');
      const formData = new FormData();
      Object.keys(formDataObj).forEach((key) => {
        formData.append(key, formDataObj[key]);
      });
      formData.append("_method", "PUT");
      
      const response = await apiClient.auth.verifyDocuments(
        `/Posp/update/documents/${pospId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Document verification");

      return rejectWithValue({
        error: errorMessage,
        createError: error.response?.data,
      });
    }
  }
);

// Fetch POSP by ID
export const fetchPospById = createAsyncThunk(
  "auth/fetchPospById",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
     
      const response = await apiClient.get(`/Posp/getPospDataByID/${id}`);
      
      const mergedData = {
        ...response.data.user,
        ...response.data.images,
      };
      
     
      return mergedData;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch POSP by ID");
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch Training Seconds
export const fetchTrainingSeconds = createAsyncThunk(
  "auth/fetchTrainingSeconds",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      // Log training fetch
      logUserAction("fetch_training_hours", { userId: userInfo.userId });
      
      const response = await apiClient.get(`/Posp/get_training`);
      
      
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch training hours");
      
      // Log failed training fetch
      logUserAction("training_hours_fetch_failed", { 
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Update Training Seconds
export const updateTrainingSeconds = createAsyncThunk(
  "auth/updateTrainingSeconds",
  async (trainingSeconds, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
   
      
      const response = await apiClient.put(
        `/Posp/updateTrainingHours`,
        { training_seconds: trainingSeconds }
      );
      
      // Enhanced training update logging
     
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update training hours");
      
    
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch Exam Questions
export const fetchExamQuestions = createAsyncThunk(
  "auth/fetchExamQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
      // Log exam questions fetch
      Logger.info("Fetch exam questions", { 
        userId: userInfo.userId,
        timestamp: new Date().toISOString()
      }, "EXAM");
      
      logUserAction("fetch_exam_questions", { userId: userInfo.userId });
      
      const response = await apiClient.auth.get(endpoints.POSP.GET_EXAM_QUESTIONS);
      
    
      // Store in session storage
      sessionStorage.setItem(
        "examQuestions",
        JSON.stringify(response.data.questions)
      );
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch exam questions");
      
     
      return rejectWithValue(errorMessage);
    }
  }
);

// Submit Exam Responses
export const submitExamResponses = createAsyncThunk(
  "auth/submitExamResponses",
  async (examData, { rejectWithValue }) => {
    try {
      const userId = examData.user_id || 'unknown';
   
      
      const response = await apiClient.post(
        endpoints.POSP.SUBMIT_EXAM,
        examData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      
      
      // Clear session storage
      sessionStorage.removeItem("examQuestions");
      sessionStorage.removeItem("examStartTime");
      sessionStorage.removeItem("examResponses");
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Submit exam");
      
      // Log failed exam submission
      logUserAction("exam_submission_failed", { 
        userId: examData.user_id || 'unknown',
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch All POSP Data
export const fetchAllPospData = createAsyncThunk(
  "auth/fetchAllPospData",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
    
      const response = await apiClient.get(ENDPOINTS.POSP.GET_ALL_POSP);
      
      const mergedData = response.data.map((item) => ({
        ...item.user,
        ...item.images,
        posp_reporting_manager: item.user.posp_reporting_manager,
      }));
      
   
      return mergedData;
    } catch (error) {
      const errorMessage = handleApiError(error, "Fetch all POSP data");
      
      // Log failed data fetch
      logUserAction("all_posp_data_fetch_failed", { 
        userId: getUserInfoForLogging().userId,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);


// Update Documents Action (HR)
export const updateDocumentsAction = createAsyncThunk(
  "posp/updateDocumentsAction",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
      
   
      
      const response = await apiClient.put(
        `${endpoints.POSP.HR_UPDATE_DOCUMENTS}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Update documents");
      
      // Log failed documents update
      logUserAction("hr_documents_update_failed", { 
        pospId: id,
        error: errorMessage
      });
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Verify Email (Forgot Password)
export const verifyEmail = createAsyncThunk(
  "posp/verifyEmail",
  async (email, { rejectWithValue }) => {
    try {
   
      const response = await apiClient.post(endpoints.AUTH.FORGOT_PASSWORD, { email });
    
      if (response.data.message === "OTP sent successfully to your email.") {
        return { success: true, message: response.data.message };
      }
      
      throw new Error("Unexpected response from the server.");
    } catch (error) {
      const errorMessage = handleApiError(error, "Verify email");
      
    
      
      return rejectWithValue(errorMessage);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "posp/resetPassword",
  async ({ email, otp, password, password_confirmation }, { rejectWithValue }) => {
    try {
   
      const response = await apiClient.post(endpoints.AUTH.RESET_PASSWORD, {
        email,
        otp: parseInt(otp, 10),
        password,
        password_confirmation,
      });
      
     
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Reset password");
 
      return rejectWithValue(errorMessage);
    }
  }
);

// Toggle POSP Status
export const togglePospStatus = createAsyncThunk(
  "posp/togglePospStatus",
  async (pospId, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
  
      const response = await apiClient.put(
        `${endpoints.POSP.TOGGLE_ACTIVE}/${pospId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      
      if (response.data.message) {
        return {
          active: response.data.active,
          pospId,
        };
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      const errorMessage = handleApiError(error, "Toggle POSP status");
     
      return rejectWithValue(errorMessage);
    }
  }
);

// Send Email to POSP
export const sendEmailToPosp = createAsyncThunk(
  "posp/sendEmailToPosp",
  async (emailData, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
    
      const response = await apiClient.post(
        endpoints.POSP.SEND_EMAIL,
        emailData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
   
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Send email to POSP");
      return rejectWithValue(errorMessage);
    }
  }
);

// Toggle Documents Verification
export const toggleDocumentsVerification = createAsyncThunk(
  "posp/toggleDocumentsVerification",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
     
      
      const response = await apiClient.put(
        `${endpoints.POSP.TOGGLE_DOCS_VERIFICATION}/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Toggle documents verification");
     
      return rejectWithValue(errorMessage);
    }
  }
);

// Toggle Can Update Documents
export const toggleCanUpdateDocuments = createAsyncThunk(
  "posp/toggleCanUpdateDocuments",
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = getUserInfoForLogging();
    
      const response = await apiClient.put(
        `${endpoints.POSP.TOGGLE_UPDATE_DOCS}/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      // Log permission toggle success
      logUserAction("update_documents_permission_toggled", { 
        pospId: id,
        status: response.data.status
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error, "Toggle update documents");
      
    
      
      return rejectWithValue(errorMessage);
    }
  }
);
export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (data, { rejectWithValue }) => {
    try {
      const res = await apiClient.auth.verifyToken(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.message || "Token invalid");
    }
  }
);

// /* =====================================================
//    ⭐ verifyEmail → Since you asked for verifyEmail, not verifyToken
//    aligns with AuthService.verifyToken()
//    =====================================================*/
// export const verifyEmail = createAsyncThunk(
//   "auth/verifyEmail",
//   async (data, { rejectWithValue }) => {
//     try {
//       // ⭐ calling AuthService.verifyToken()
//       const res = await apiClient.auth.verifyToken(data);

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err?.message || "Verification failed");
//     }
//   }
// );


// export const logout = createAsyncThunk("auth/logout", async () => {
//   await apiClient.clearAuth();
//   // return null;
// });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      // Update registration status based on user data
    },

    // ============================NEW================================
    clearResendStatus: (state) => {
      state.resendSuccess = false;
      state.resendMessage = null;
      state.error = null;
    },
    resetSignupSuccess: (state) => {
      state.success = false;
      state.message = null;
    },
    resetPosp: (state) => {
      state.error = null;
      state.createError = null;
      state.createSuccess = false;
      state.questionSuccess = false;
    },
    resetUpdateSuccess: (state) => {
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.posp = null;
      state.authToken = null;
      state.error = null;
      state.success = false;
      Cookies.remove("authToken");
      Cookies.remove("userId");
      Cookies.remove("emailId");
      Cookies.remove("LoginEmailId");
      Cookies.remove("PersonalEmailId");
      Cookies.remove("branchId");
      Cookies.remove("user");
      localStorage.removeItem("examStartTime");
      localStorage.removeItem("elapsedTime");
    },
    sendEmailReset: (state) => {
      state.sendEmailError = null;
      state.sendEmailSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔹 Login
      .addCase(loginUser.pending, (state) => {
         state.loading = true;
        state.error = null;
        state.loginError = null;
        state.success = false;
        state.createSuccess = false;
        state.createError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
         state.loading = false;
        state.loginError = null;
        state.success = true;
        const token = action.payload?.token;
        const user = action.payload?.user;
        // console.log("fulfilled",token,user)
        if (token) {
          state.isAuthenticated = true;
          state.authToken = token;
          state.user = user;
          setEncryptedCookie("user", {
            id: action.payload.user?.id,
            email: action.payload.user?.email,
            branch_id: action.payload.user?.branch_id,
            login_email: action.payload.user?.login_email,
            personal_email: action.payload.user?.personal_email,
            email_verification: action.payload.email_verification,
            documents_verification: action.payload.documents_verification,
            training_seconds: action.payload.training_seconds,
            can_exam: action.payload.can_exam,
            exam: action.payload.exam,
            role: action.payload.user?.role,
          });
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
       state.loginError = action.payload;
        state.user = null;
        state.token = null;
        Cookies.remove("authToken");
        Cookies.remove("userId");
        Cookies.remove("emailId");
        Cookies.remove("LoginEmailId");
        Cookies.remove("PersonalEmailId");
        Cookies.remove("branchId");
        localStorage.removeItem("examStartTime");
        localStorage.removeItem("elapsedTime");
        
      })

      // 🔹 Verify Token
      .addCase(verifyToken.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.isAuthenticated = true;
        }
      })

      // // 🔹 Logout
      // .addCase(logout.fulfilled, (state) => {
      //   state.isAuthenticated = false;
      //   state.authToken = null;
      //   state.user = null;
      // });
      // 🔹 Register User
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupError = null;
        state.success = false;
        state.resendSuccess = false;
        state.message = null;
        state.posp = null;
        state.resendMessage = null;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.signupError = null;
        state.success = true;
        state.createSuccess = false;
        Cookies.set("authToken", action.payload.token, {
          expires: 240 / 1440,
          secure: false,
          sameSite: "Strict",
        });
        setEncryptedCookie("user", {
          id: action.payload.user.id,
          email: action.payload.user.email,
          branch_id: action.payload.user.branch_id,
          login_email: action.payload.user.login_email,
          personal_email: action.payload.personal_email,
          role: action.payload.user.role,
        });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.signupError = action.payload;
        state.user = null;
        state.token = null;
      });

    // 🔹 Resend Email Verification
    builder
      .addCase(resendEmailVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupError = null;
        state.success = false;
        state.resendSuccess = false;
        state.message = null;
        state.posp = null;
        state.resendMessage = null;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(resendEmailVerification.fulfilled, (state, action) => {
        state.resendMessage = action.payload.message;
        state.error = null;
        state.loading = false;
        state.resendSuccess = true;
        state.createSuccess = false;
        state.token = getTokenFromCookies();
      })
      .addCase(resendEmailVerification.rejected, (state, action) => {
        state.error = action.payload;
        state.resendMessage = null;
        state.resendSuccess = false;
        state.token = getTokenFromCookies();
      });

    // 🔹 Verify User Document
    builder
      .addCase(verifyUserDocument.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(verifyUserDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.token = getTokenFromCookies();
        state.createSuccess = true;
        state.error = null;
        state.createError = null;
      })
      .addCase(verifyUserDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
        state.createError = action.payload?.createError;
      });

    // 🔹 Fetch POSP by ID
    builder
      .addCase(fetchPospById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupError = null;
        state.success = false;
        state.resendSuccess = false;
        state.message = null;
        state.posp = null;
        state.resendMessage = null;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(fetchPospById.fulfilled, (state, action) => {
        state.loading = false;
        state.posp = action.payload;
        state.token = getTokenFromCookies();
        state.signupError = null;
        state.success = true;
        state.createSuccess = false;
        state.createError = null;
      })
      .addCase(fetchPospById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🔹 Fetch Training Seconds
    builder
      .addCase(fetchTrainingSeconds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainingSeconds.fulfilled, (state, action) => {
        state.loading = false;
        state.training = action.payload;
      })
      .addCase(fetchTrainingSeconds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🔹 Update Training Seconds
    builder
      .addCase(updateTrainingSeconds.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTrainingSeconds.fulfilled, (state, action) => {
        state.loading = false;
        state.training = action.payload;
        state.success = true;
      })
      .addCase(updateTrainingSeconds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // 🔹 Fetch Exam Questions
    builder
      .addCase(fetchExamQuestions.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.examQuestions = [];
      })
      .addCase(fetchExamQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.examQuestions = action.payload.questions;
        state.message = action.payload.message;
      })
      .addCase(fetchExamQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.examQuestions = [];
      });

    // 🔹 Submit Exam Responses
    builder
      .addCase(submitExamResponses.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.questionSuccess = false;
        state.submitresponse = null;
      })
      .addCase(submitExamResponses.fulfilled, (state, action) => {
        state.loading = false;
        state.questionSuccess = true;
        state.submitresponse = action.payload;
        localStorage.removeItem("examStartTime");
      })
      .addCase(submitExamResponses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.questionSuccess = false;
        state.success = false;
        state.submitresponse = null;
      });

    // 🔹 Fetch All POSP Data
    builder
      .addCase(fetchAllPospData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupError = null;
        state.success = false;
        state.resendSuccess = false;
        state.message = null;
        state.posp = null;
        state.resendMessage = null;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(fetchAllPospData.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosp = action.payload;
        state.token = getTokenFromCookies();
        state.signupError = null;
        state.success = true;
        state.createSuccess = false;
        state.createError = null;
      })
      .addCase(fetchAllPospData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🔹 Update Documents Action (HR)
    builder
      .addCase(updateDocumentsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createError = null;
        state.editSuccess = false;
        state.success = false;
        state.editError = null;
      })
      .addCase(updateDocumentsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.editSuccess = true;
        state.allPosp = state.allPosp.map((posp) =>
          posp.id === action.payload.id ? action.payload : posp
        );
        state.formData = action.payload;
        state.success = true;
        state.error = null;
        state.createError = null;
      })
      .addCase(updateDocumentsAction.rejected, (state, action) => {
        state.loading = false;
        state.editError = action.payload;
        state.success = false;
      });

    // 🔹 Verify Email (Forgot Password)
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.emailVerificationLoading = true;
        state.emailVerificationError = null;
        state.emailVerified = false;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.emailVerificationLoading = false;
        state.emailVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.emailVerificationLoading = false;
        state.emailVerificationError = action.payload;
        state.emailVerified = false;
      });

    // 🔹 Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetError = null;
        state.passwordResetSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.passwordResetLoading = false;
        state.passwordResetSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload;
        state.passwordResetSuccess = false;
      });

    // 🔹 Toggle POSP Status
    builder
      .addCase(togglePospStatus.pending, (state) => {
        state.toggleLoading = true;
        state.error = null;
      })
      .addCase(togglePospStatus.fulfilled, (state, action) => {
        const toggledPospId = action.payload.pospId;
        state.toggleLoading = false;
        if (toggledPospId) {
          state.allPosp = state.allPosp.map((posp) =>
            posp.id === toggledPospId
              ? { ...posp, active: !posp.active }
              : posp
          );
        }
      })
      .addCase(togglePospStatus.rejected, (state, action) => {
        state.toggleLoading = false;
        state.error = action.payload;
      });

    // 🔹 Send Email to POSP
    builder
      .addCase(sendEmailToPosp.pending, (state) => {
        state.sendEmailError = null;
        state.sendEmailSuccess = false;
      })
      .addCase(sendEmailToPosp.fulfilled, (state) => {
        state.sendEmailSuccess = true;
      })
      .addCase(sendEmailToPosp.rejected, (state, action) => {
        state.sendEmailError = action.payload;
      });

    // 🔹 Toggle Documents Verification
    builder
      .addCase(toggleDocumentsVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(toggleDocumentsVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(toggleDocumentsVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // 🔹 Toggle Can Update Documents
    builder
      .addCase(toggleCanUpdateDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(toggleCanUpdateDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(toggleCanUpdateDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearError , setUser,clearResendStatus,resetSignupSuccess,resetPosp,resetUpdateSuccess,logout,sendEmailReset } = authSlice.actions;
export default authSlice.reducer;
