package com.rgbitsoft.admin.graalvm;

import com.oracle.truffle.js.lang.JavaScriptLanguage;
import com.oracle.truffle.js.runtime.objects.JSOrdinaryObject;
import com.oracle.truffle.js.scriptengine.GraalJSEngineFactory;
import com.oracle.truffle.js.scriptengine.GraalJSScriptEngine;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Source;
import org.graalvm.polyglot.Value;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.script.*;
import java.io.*;
import java.lang.reflect.Field;

public class GraalvmTests {

    private Reader read(String path) {
        InputStream in = getClass().getClassLoader().getResourceAsStream(path);
        return new InputStreamReader(in);
    }
    @Test
    public void testJS() throws ScriptException {
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("graal.js"); //  --- (1)
        engine.eval("console.log('Hello World');");
    }

    @Test
    public void testReadFileJS() throws ScriptException {
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("graal.js"); //  --- (1)
        engine.eval(read("static/js/test.js"));

    }



    @Test
    public void testReadFileJS2() throws ScriptException, IOException {
        Context ctx = Context.newBuilder("js").allowAllAccess(true).build();
        File file = new File(String.valueOf(getClass().getClassLoader().getResource("static/js/test.js")));
        Source source = Source.newBuilder(JavaScriptLanguage.ID, file).build();
        Value value = ctx.eval(source);

        Value result = value.execute("senshig");
        System.out.println(result);

    }
    public static class JavaMethods {
        public void printWidthOf(Object size) throws Exception {
            Field f = size.getClass().getDeclaredField("guestObject");
            f.setAccessible(true);
            JSOrdinaryObject obj = (JSOrdinaryObject) f.get(size);
            System.out.println(obj.getValue("width"));
        }
    }

    @Test
    public void testttt() throws FileNotFoundException, ScriptException, NoSuchMethodException {

        GraalJSEngineFactory factory = new GraalJSEngineFactory();
        GraalJSScriptEngine engine = factory.getScriptEngine();

        Bindings bindings = engine.getBindings(ScriptContext.ENGINE_SCOPE);
        bindings.put("polyglot.js.allowHostAccess", true);
        bindings.put("JavaMethods", new JavaMethods());

        engine.eval(read("static/js/test.js"));
        engine.invokeFunction("start");
    }

    @Test
    public void testttt2() throws FileNotFoundException, ScriptException, NoSuchMethodException {

        GraalJSEngineFactory factory = new GraalJSEngineFactory();
        GraalJSScriptEngine engine = factory.getScriptEngine();

        Bindings bindings = engine.getBindings(ScriptContext.ENGINE_SCOPE);
        bindings.put("polyglot.js.allowHostAccess", true);
        engine.eval(read("static/js/test.js"));

        final String JS_FUNC_NAME = "sumPrint";

        System.out.println("[ JS Function ] - " + JS_FUNC_NAME + " : ");
        System.out.println( engine.getContext().getAttribute(JS_FUNC_NAME));
        System.out.println("------------------------------------------");

        engine.invokeFunction(JS_FUNC_NAME,123, 22);

    }


    @DisplayName("GraalvmJsTest - JS Function")
    @Test
    public void GraalvmJsTest(){
        final String JS_CODE = "(function myFun(param){ return 'hello '+ param;})";

        try (Context context = Context.create()) {
            Value value = context.eval("js", JS_CODE);
            Value result = value.execute("senshig");
            System.out.println(result);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @DisplayName("GraalvmPythonTest - Python Function")
    @Test
    public void GraalvmPythonTest(){
        final String Python_CODE = "(function myFun(param){ return 'hello '+ param;})";
        try (Context context = Context.create()) {
            Value value = context.eval("python", Python_CODE);
            Value result = value.execute("senshig");
            System.out.println(result);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}