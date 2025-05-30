const SubjectModal = require("../model/subject.modal");

const getSubjects = async (req, res) => {
  try {
    const subjectRes = await SubjectModal.find(); //แสดงข้อมูล
    if (subjectRes.length === 0) {
      console.log("Data not found");
      return res.status(404).json({ massage: "get Subject not found" });
    } else {
      res.json(subjectRes);
      console.log("data fetch:", subjectRes);
    }
  } catch (error) {
    res.status(500).json({ massage: "get Subject data fail" });
  }
};

const viewSubject = async (req, res) => {
  const { id } = req.params;
  try {
    const subject = await SubjectModal.findById(id);
    if (subject.length === 0) {
      return res.status(404).json({ massage: "get Subject not found" });
    }
    res.status(200).json({ subject });
  } catch (error) {
    console.error("❌ ERROR at //getSubjectByID/ :", error.message || error);
    res.status(500).json({
      message: "get Subject fail",
      error: error.message || error,
    });
  }
};

const createSubject = async (req, res) => {
  try {
    //สร้างรหัสวิชา เลือกจากหน้าบ้าน => ได้เป็นหมายเลขออกมาประกอบกัน
    // const newSubject = await SubjectModal.create(req.body); //create new sunject service
    const newSubject = new SubjectModal();
    const requestBody = req.body;
    newSubject.subjectID = requestBody.subjectID;
    newSubject.subjectNameTH = requestBody.subjectNameTH;
    newSubject.subjectNameEN = requestBody.subjectNameEN;
    newSubject.description = requestBody.description;
    newSubject.prerequisite = requestBody.prerequisite;
    newSubject.credit = requestBody.credit;
    newSubject.lectureTime = requestBody.lectureTime;
    newSubject.labTime = requestBody.labTime;
    newSubject.selfLearningTime = requestBody.selfLearningTime;
    newSubject.actionStatus = requestBody.actionStatus;
    newSubject.subjectType = requestBody.subjectType;
    newSubject.major_id = requestBody.major_id;
    newSubject.campus_id = requestBody.campus_id;
    newSubject.createDate = new Date() ;
    newSubject.updateDate = new Date() ;
    await newSubject.save();
    const lineSentMassage = `📚 วิชาใหม่ถูกเพิ่มแล้ว:\nรหัส: ${newSubject.subjectID}\nชื่อ: ${newSubject.subjectNameTH}`;
    console.log("message to sent line notificate:", lineSentMassage);
    res.status(200).json({ newSubject });
  } catch (error) {
    console.error("❌ ERROR at /createSubject:", error.message || error);

    res.status(500).json({
      message: "create new subject fail",
      error: error.message || error,
    });
  }
};

const updateSubject = async (req, res) => {
  const { id } = req.params;
  try {
    const requestBody = req.body;
    // const subject = await SubjectModal.findByIdAndUpdate(id, req.body);
    const subject = await SubjectModal.findByIdAndUpdate(id, {
      subjectID : requestBody.subjectID,
      subjectNameTH : requestBody.subjectNameTH,
      subjectNameEN : requestBody.subjectNameEN,
      description : requestBody.description,
      prerequisite : requestBody.prerequisite,
      credit : requestBody.credit,
      lectureTime : requestBody.lectureTime,
      labTime : requestBody.labTime,
      selfLearningTime : requestBody.selfLearningTime,
      actionStatus : requestBody.actionStatus,
      subjectType : requestBody.subjectType,
      major_id : requestBody.major_id,
      campus_id : requestBody.campus_id,
      updateDate : new Date()
    },
    {
      new: true,         // ให้คืนค่าที่อัปเดตแล้ว
      runValidators: true  // ให้ตรวจสอบ schema validation ด้วย
    });
    
    if (!subject) {
      return res.status(404).json({ massage: `update subject fail ${id}` });
    }
    //ดึงข้อมูลที่อัปเดตใหม่
    const updateSubject = await SubjectModal.findById(id);
    res.status(200).json(updateSubject);
  } catch (error) {
    console.error("❌ ERROR at /updateSubject :", error.message || error);
    res.status(500).json({
      massage: error.message || error,
    });
  }
};

const deleteSubject = async (req, res) => {
  const { id } = req.params;
  try {
    const subject = await SubjectModal.findByIdAndDelete(id);
    if (!subject) {
      return res
        .status(404)
        .json({ massage: `this ${id} not found to delete` });
    }
    res.status(200).json({ massage: `delete subject id : ${id} successfully` });
  } catch (error) {
    console.error("❌ ERROR at /deleteSubject :", error.message || error);
    res.status(500).json({
      massage: error.message || error,
    });
  }
};

module.exports = {
  getSubjects,
  viewSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
